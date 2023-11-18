"use strict";
const JWT = require("jsonwebtoken");
const asyncHandler = require("../helpers/asyncHandler");
const {
  BadRequestError,
  ConflictRequestError,
  AuthFailureError,
  NotFoundError
} = require("../core/error.response");

// service
const {findByUserId} = require('../services/keyToken.services')

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: "authorization",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    // Verify access token using publicKey
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error("error verify::", err);
      } else {
        console.log(`decode verify::`, decode);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("error in HERE");
    return error;
  }
};

const authentication = asyncHandler(async (req, res, next) => {
  /**
   * 1 - Check userId missing
   * 2 - get accessToken
   * 3 - Verify token
   * 4 - check user in db
   * 5 - check keyStore with this user Id
   * 6 - Ok all => return next()
   */
  const request = req
  // console.log(request)
  // console.log(HEADER)
  console.log(HEADER.CLIENT_ID)
  const userId = req.headers[HEADER.CLIENT_ID]
  console.log(userId)
  if(!userId) throw new AuthFailureError('Invalid Request 1')

  // 2 - get accessToken
  const keyStore = await findByUserId(userId)
  if(!keyStore) throw new NotFoundError('Not found keystore')

  // 3 - Verify token
  const accessToken = req.headers[HEADER.AUTHORIZATION]
  if(!accessToken) throw new AuthFailureError('Invalid Request 2')
  
  try {
    const decodeUser = JWT.verify(accessToken,keyStore.publicKey)
    if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid UserId')
    console.log('keyStore::',keyStore)
    req.keyStore= keyStore
    return next()
  } catch (error) {
    throw error
  }
})




module.exports = {
  createTokenPair,
  authentication
};
