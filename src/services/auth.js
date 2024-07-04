"use strict";

const { AccountRoleEnum } = require("../common/enum");
const { HTTP_STATUS, HTTP_RESPONSE } = require("../common/http-response");
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken");
const { createTokenPair, getInfoData } = require("../utils");
const { BadRequestError } = require("../core/error.response");

class AuthService {
  static signUp = async ({ name, email, password }) => {
    const existedShop = await shopModel.findOne({ email }).lean();
    if (existedShop) {
      throw new BadRequestError("Shop already exist!");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [AccountRoleEnum.SHOP],
    });

    if (newShop) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        throw new BadRequestError("keyStore Error!");
      }

      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      );
      console.log("Created Token Success: ", tokens);

      return {
        status: HTTP_STATUS.CREATED,
        code: HTTP_RESPONSE.AUTH.CREATE_KEY_SUCCESS.CODE,
        message: HTTP_RESPONSE.AUTH.CREATE_KEY_SUCCESS.MESSAGE,
        metadata: {
          shop: getInfoData({
            fields: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        },
      };
    }

    return {
      status: HTTP_STATUS.SUCCESS,
      metadata: null,
    };
  };
}

module.exports = AuthService;
