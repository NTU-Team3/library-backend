const authService = require("../services/auth.service");

class AuthController {
  async login(req, res, next) {
    console.log("hit");
    console.log(req.body);

    const { email, password } = req.body;
    console.log(`${email} ${password} `);
    next();
  }
}

module.exports = AuthController;
