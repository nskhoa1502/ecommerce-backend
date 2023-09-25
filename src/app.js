require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");

const app = express();

// console.log(`Process: `, process.env);
// Init middlewares

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init database
require("./dbs/init.mongodb");
const { checkOverload } = require("./helpers/check.connect");
checkOverload();

// init router
app.get("/", (req, res, next) => {
  //   const strCompress = "Hello World";

  return res.status(200).json({
    // message: "strCompress",
    // metadata: strCompress.repeat(10000),
  });
});

// handling errors

module.exports = app;
