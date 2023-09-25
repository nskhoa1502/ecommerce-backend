"use strict";

// Dev env
const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 5000,
  },
  db: {
    host: process.env.DEV_DB_HOST || "127.0.0.1", // localhost
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "shopDEV",
  },
};

// Production env
const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 5000,
  },
  db: {
    host: process.env.PRO_DB_HOST || "localhost", // localhost
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || "shopPRO",
  },
};

const config = { dev, pro };

// When run production-> NODE_ENV=pro node --watch server.js
const env = process.env.NODE_ENV || "dev";
// console.log(config[env], env);

module.exports = config[env];
