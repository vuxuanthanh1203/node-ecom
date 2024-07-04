"use strict";

const express = require("express");
const authRoute = require("./auth");
const packageJson = require("../../package.json");

const router = express.Router();

router.get("/version", async (req, res) => {
  return res.status(200).json({
    message: `Version: ${packageJson.version}`,
  });
});

router.use("/auth", authRoute);

module.exports = router;
