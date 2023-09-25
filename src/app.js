require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");

const app = express();

// console.log(`Process: `, process.env);
// Init middlewares
app.use(express.json());
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

// handling errors

module.exports = app;
