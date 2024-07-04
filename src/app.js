require("dotenv").config();
const compression = require("compression");
const { default: helmet } = require("helmet");
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");
const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init db
require("./dbs/init.mongodb");

// init routes
app.use("/api", routes);

// handling error

module.exports = app;
