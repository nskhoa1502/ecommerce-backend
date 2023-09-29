"use strict";

const shopModel = require("../models/shop.model");

const findShopByEmail = async ({
  email,
  select = {
    email: 1,
    password: 1,
    name: 1,
    status: 1,
    roles: 1,
  },
}) => {
  console.log(`email la :::`, email);
  return await shopModel.findOne({ email }).select(select).lean();
};

module.exports = {
  findShopByEmail,
};
