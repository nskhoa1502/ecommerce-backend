"use strict";
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("../services/keyToken.services");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData, generateKey } = require("../utils");
const {
  BadRequestError,
  ConflictRequestError,
} = require("../core/error.response");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

// ======= SERVICE ======= //
const { findShopByEmail } = require("./shop.service");
class AccessService {
  // Frontend should include refreshToken in the request, if user already had cookie, we don't need to query into database => save resource and faster

  /*
  1 - Check email in database
  2 - match password
  3 - Generate privateKey and publicKey
  4 - Generate tokens - accessToken and refreshToken and save
  5 - Get data and return login
  */
  static login = async ({ email, password, refreshToken = null }) => {
    // 1. Check email in database
    const foundShop = await findShopByEmail({ email });
    if (!foundShop) throw new BadRequestError("Shop not registered");

    // 2. Match password
    const match = bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthFailureError("Authentication error");

    // 3.
    // create privateKey, publicKey
    const privateKey = generateKey();
    const publicKey = generateKey();

    // 4. Generate tokens
    const tokens = await createTokenPair(
      { userId: foundShop._id, email },
      publicKey,
      privateKey
    );

    // Save privateKey, publicKey and refreshToken into database
    await KeyTokenService.createKeyToken({
      userId: foundShop._id,
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
    });
    return {
      shop: getInfoData({
        fields: ["_id", "name", "email"],
        object: foundShop,
      }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password }) => {
    // console.log({ name, email, password });

    // Step 1 : Check email exist

    // lean is used to make mongodb return a plain javascript object instead of mongoose object (larger size)

    const holderShop = await shopModel.findOne({ email }).lean();

    if (holderShop) {
      throw new BadRequestError("Error: Shop already registered!");
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
      const privateKey = generateKey();
      const publicKey = generateKey();

      // console.log({ privateKey, publicKey }); // save to collection KeyStore

      // Step 4 : Use keyToken service to create a record
      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        throw new BadRequestError("Error: keyStore error");
        // return {
        //   code: "xxxx",
        //   message: "keyStore error",
        // };
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
  };
}

module.exports = AccessService;
