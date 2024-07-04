const express = require("express");
const authController = require("../controllers/auth");
const {
  apiKey,
  checkPermission,
  asyncHandler,
} = require("../middlewares/auth");
const { AccountRoleEnum } = require("../common/enum");

const router = express.Router();

router.post(
  "/signup",
  apiKey,
  checkPermission(AccountRoleEnum.ADMIN),
  asyncHandler(authController.signUp)
);

router.post("/login", asyncHandler(authController.login));

module.exports = router;
