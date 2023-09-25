"use strict";

const { apiKey, permissionCheck } = require("../auth/checkAuth");

const router = require("express").Router();

// check apiKey
router.use(apiKey);

// check permission
router.use(permissionCheck("0000"));

router.use("/v1/api", require("./access"));

module.exports = router;
