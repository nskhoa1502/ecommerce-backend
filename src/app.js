const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");

const app = express();

// Init middlewares

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init database

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
