require("dotenv").config();
const compression = require("compression");
const { default: helmet } = require("helmet");
const express = require("express");
const morgan = require("morgan");
const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression);

// init db
require("./dbs/init.mongodb");
// init routes

// handling error

module.exports = app;
