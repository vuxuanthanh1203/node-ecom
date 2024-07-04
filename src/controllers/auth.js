"user strict";

const AuthService = require("../services/auth");
const { SuccessResponse } = require("../core/success.response");

class AuthController {
  signUp = async (req, res, next) => {
    new SuccessResponse({
      statusCode: 201,
      message: "SignUp success!",
      metadata: await AuthService.signUp(req.body),
    }).send(res);
  };

  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AuthService.login(req.body),
    }).send(res);
  };
}

module.exports = new AuthController();
