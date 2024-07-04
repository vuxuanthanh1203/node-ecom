"user strict";

const AuthService = require("../services/auth");
const { CREATED } = require("../core/success.response");

class AuthController {
  signUp = async (req, res, next) => {
    new CREATED({
      message: "SignUp success!",
      metadata: await AuthService.signUp(req.body),
    }).send(res);
  };
}

module.exports = new AuthController();
