"use strict";

const AccessService = require("../services/access.service");

const { OK, CREATED, SuccessResponse } = require("../core/success.response");
const { reset } = require("nodemon");
class AccessController {
  // Login
  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body),
    }).send(res);
  };
  // logout
  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout successfully!",
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };

  // SignUp
  signUp = async (req, res, next) => {
    // console.log("[P]::signUp::", req.body);
    new CREATED({
      message: "Registered successfully!",
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
    // return res.status(201).json(await AccessService.signUp(req.body));
  };
}

module.exports = new AccessController();
