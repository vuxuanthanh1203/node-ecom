"use strict";

const { AccountRoleEnum } = require("../common/enum");
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

    if (!newShop) throw new BadRequestError("SignUp Failed!");

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
      metadata: {
        shop: getInfoData({
          fields: ["_id", "name", "email"],
          object: newShop,
        }),
        tokens,
      },
    };
  };

  static login = async ({ email, password, refreshToken = null }) => {
    const existedShop = await shopModel.findOne({ email }).lean();
    if (!existedShop) throw new BadRequestError("Shop not exist!");

    const match = bcrypt.compare(password, existedShop.password);
    if (!match) throw new AuthFailureError("Authentication Error");

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const { _id: userId } = existedShop;
    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
      userId,
    });

    return {
      shop: getInfoData({
        fields: ["_id", "name", "email"],
        object: existedShop,
      }),
      tokens,
    };
  };
}

module.exports = AuthService;
