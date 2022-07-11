const authService = require("../services/auth.service");

class AuthController {
  /** =======================================================================================
   *  Controller logic for registering new members
   *  @param: username - user display name
   *  @param: email - email address
   *  @param: password - plaintext password
   *
   ** ======================================================================================= */
  async register(req, res) {
    const { username, email, plaintextPassword } = req.body;

    /* validation */
    if (!username || typeof username !== "string") {
      return res.status(400).json({
        message: "Username cannot be empty and must be in text format",
      });
    }

    if (!email || typeof email !== "string") {
      return res
        .status(400)
        .json({ message: "Email cannot be empty and must be in text format" });
    }

    if (!plaintextPassword || typeof plaintextPassword !== "string") {
      return res.status(400).json({
        message: "Password cannot be empty and must be in text format.",
      });
    }

    if (plaintextPassword.length < 5) {
      return res.status(400).json({
        message: "Password should be at least 5 characters long",
      });
    }

    const { status, data, message } = await authService.register(
      username,
      email,
      plaintextPassword
    );
    res.status(status);
    res.json({ message, data });
    return res;
  }

  async login(req, res) {
    const { email, password } = req.body;
    console.log(`${email} ${password} `);

    if (!email || !password) {
      return res.status(400).json({
        message: "email or password cannot be empty.",
      });
    }
    const { status, data, message } = await authService.login(email, password);
    console.log(`status ${status}, message: ${message}, data: ${data}`);
    res.status(status);
    res.json({ message, data });
  }
}

module.exports = AuthController;
