"use strict";

const jwt = require("jsonwebtoken");
const _ = require("lodash");

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await jwt.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = await jwt.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error("error verify: ", err);
      }
      console.log("decode verify: ", decode);
    });

    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

module.exports = {
  createTokenPair,
  getInfoData,
};
