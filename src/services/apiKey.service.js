"use strict";
const apiKeyModel = require("../models/apiKey.model");
const crypto = require("crypto");

const findApiKeyById = async (key) => {
  //   Check if apiKey exist in database
  //   const newKey = await apiKeyModel.create({
  //     key: crypto.randomBytes(32).toString("hex"),
  //     permissions: ["0000"],
  //   });
  //   console.log(newKey);
  const objKey = await apiKeyModel.findOne({ key, status: true }).lean();
  // console.log(`object key`, objKey);
  return objKey;
};

module.exports = { findApiKeyById };
