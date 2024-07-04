const express = require("express");
const authController = require("../controllers/auth");
const { apiKey, checkPermission } = require("../middlewares/auth");
const { AccountRoleEnum } = require("../common/enum");

const router = express.Router();

router.post(
  "/signup",
  apiKey,
  checkPermission(AccountRoleEnum.ADMIN),
  authController.signUp
);

module.exports = router;
