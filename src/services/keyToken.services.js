"use strict";

const keytokenModel = require("../models/keytoken.model");
const { Types } = require("mongoose");
// Version 1
class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    // Store public key of user into db
    try {
      // Version 1
      // const tokens = await keytokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey,
      // });

      // Version 2
      const filter = { user: userId };
      console.log(`userId la:::`, userId);
      const update = {
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshToken,
      };
      // upsert = update + insert. If already have, it will update, if first time, it will insert
      const options = { upsert: true, new: true };
      const tokens = await keytokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  static findByUserId = async (userId) => {
    return await keytokenModel.findOne({ user: new Types.ObjectId(userId) }).lean();
  }

  static removeKeyById = async (id) => {
    return await keytokenModel.deleteOne(id)
  }
}

module.exports = KeyTokenService;
