"use strict";
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("../services/keyToken.services");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    // console.log({ name, email, password });
    try {
      // Step 1 : Check email exist

      // lean is used to make mongodb return a plain javascript object instead of mongoose object (larger size)
      const holderShop = await shopModel.findOne({ email }).lean();

      if (holderShop) {
        return {
          code: "xxxx",
          message: "Shop has already registered",
        };
      }
      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Step 2 : If not exist, create new shop
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        // Step 3 : Create private and public key
        const privateKey = crypto.randomBytes(32).toString("hex");
        const publicKey = crypto.randomBytes(32).toString("hex");

        // console.log({ privateKey, publicKey }); // save to collection KeyStore

        // Step 4 : Use keyToken service to create a record
        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });

        if (!keyStore) {
          return {
            code: "xxxx",
            message: "keyStore error",
          };
        }

        // Create accessToken and refreshToken using createTokenPair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        );
        console.log(`Created Token Success::`, tokens);

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ["_id", "name", "email"],
              object: newShop,
            }),
            // shop: "haha",
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        stack: error.stack,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
