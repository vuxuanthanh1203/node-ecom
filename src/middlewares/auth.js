"use strict";

const crypto = require("crypto");
const { HTTP_STATUS, HTTP_RESPONSE } = require("../common/http-response");
const apiKeyModel = require("../models/apiKey.model");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: " authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        message: HTTP_RESPONSE.COMMON.FORBIDDEN.MESSAGE,
      });
    }

    // const newKey = await apiKeyModel.create({
    //   key: crypto.randomBytes(64).toString("hex"),
    //   permissions: ["00001"],
    // });
    // console.log("newKey: ", newKey);
    const objKey = await apiKeyModel.findOne({ key, status: true }).lean();

    if (!objKey) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        message: HTTP_RESPONSE.COMMON.FORBIDDEN.MESSAGE,
      });
    }
    req.objKey = objKey;
    return next();
  } catch (error) {
    console.log(error);
  }
};

const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }
    console.log("Permission: ", req.objKey.permissions);

    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }
    return next();
  };
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = { apiKey, checkPermission, asyncHandler };
