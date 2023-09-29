require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");

const app = express();

// console.log(`Process: `, process.env);
// Init middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init database
require("./dbs/init.mongodb");

/* USE TO CHECK SERVER 
const { checkOverload } = require("./helpers/check.connect");
checkOverload();
*/

// init router
app.use("/", require("./routes"));

// HANDLING ERRORS

// 404 errors

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  return res.status(404).json({
    status: "Error",
    code: error.status,
    message: "Not Found",
  });
});

// Errors
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "Error",
    code: statusCode,
    message: error.message || "Internal Server Error",
    stack: error.stack,
  });
});

module.exports = app;
