"use strict";

const { findApiKeyById } = require("../services/apiKey.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    // Check if API keys is included in the headers
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    // Check if key in headers exist in database
    const objKey = await findApiKeyById(key);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    // If exist, pass to permission check middleware
    req.objKey = objKey;
    return next();
    // return res.status(200).json({
    //   success: true,
    // });
  } catch (error) {}
};

// Check if permission in key object is valid
const permissionCheck = (permission) => {
  return (req, res, next) => {
    // Check if object Key has permission
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "Permission Denied",
      });
    }

    console.log("permissions::", req.objKey.permissions);

    // Check if permission in object key is valid
    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).json({
        message: "Permission Denied",
      });
    }

    return next();
  };
};

module.exports = { apiKey, permissionCheck };
