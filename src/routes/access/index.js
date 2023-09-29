"use strict";

const accessController = require("../../controllers/access.controller");
const router = require("express").Router();
const { asyncHandler } = require("../../core/errorHandler");

// Sign up
router.post("/shop/signup", asyncHandler(accessController.signUp));

// Login

router.post("/shop/login", asyncHandler(accessController.login));

module.exports = router;
