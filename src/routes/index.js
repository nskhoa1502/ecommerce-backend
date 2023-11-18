"use strict";

const { apiKey, permissionCheck } = require("../auth/checkAuth");
const accessController = require("../controllers/access.controller");
const asyncHandler = require("../helpers/asyncHandler");

const router = require("express").Router();

// Sign up
router.post("/v1/api/shop/signup", asyncHandler(accessController.signUp));


// check apiKey
router.use(apiKey);

// check permission
router.use(permissionCheck("0000"));

router.use("/v1/api", require("./access"));

module.exports = router;
