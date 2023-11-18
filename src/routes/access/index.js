"use strict";

const { authentication } = require("../../auth/authUtils");
const accessController = require("../../controllers/access.controller");
const router = require("express").Router();
const  asyncHandler  = require("../../helpers/asyncHandler");

// // Sign up
// router.post("/shop/signup", asyncHandler(accessController.signUp));

// Login

router.post("/shop/login", asyncHandler(accessController.login));


// authentication
router.use(authentication)

//////////////
router.post('/shop/logout', asyncHandler(accessController.logout));

module.exports = router;
