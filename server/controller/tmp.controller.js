/*





<<< TMP CONTROLLER >>> FOR AUTHENTICATION ROUTE
Please update to your setup & requirements






*/

const ObjectId = require("mongoose").Types.ObjectId;
const tmpService = require("../services/tmp.service");

class TmpController {
  // This is a class, which has methods:
  // 'register()' - creates a new member from registration
  // 'login()' - logs in registered member using email & password

  //
  /** ======================================================
   *  CONTROLLER - POST, register()
   *  ====================================================== */
  async register(req, res) {
    const { rname, remail, rpassword } = req.body;

    const pwdlowerlen = 4;
    const pwdupperlen = 12;
    const mailformat =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!remail.match(mailformat)) {
      res.status(400);
      return res.send(`Controller (register) - Invalid email, format is incorrect.`);
    }

    if (rpassword.length < pwdlowerlen || rpassword.length > pwdupperlen) {
      res.status(400);
      return res.send(`Controller (register)  - Invalid password, character count should fall between ${pwdlowerlen} - ${pwdupperlen}.`);
    }

    if (typeof rname != "string" || typeof remail != "string" || typeof rpassword != "string") {
      res.status(400);
      return res.send(`Controller (register) - Invalid member name or email or password , typeof String expected.`);
    }

    if (rname < 1) {
      res.status(400);
      return res.send(`Controller (register) - Invalid name, at least 1 character count is required.`);
    }

    const { status, data, message } = await tmpService.register(rname, remail, rpassword);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - POST, login()
   *  ====================================================== */
  async login(req, res) {
    const { lemail, lpassword } = req.body;

    const pwdlowerlen = 4;
    const pwdupperlen = 12;
    const mailformat =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!lemail.match(mailformat)) {
      res.status(400);
      return res.send(`Controller (login) - Invalid email, format is incorrect.`);
    }

    if (lpassword.length < pwdlowerlen || lpassword.length > pwdupperlen) {
      res.status(400);
      return res.send(`Controller (login) - Invalid password, character count should fall between ${pwdlowerlen} - ${pwdupperlen}.`);
    }

    const { status, data, message } = await tmpService.login(lemail, lpassword);
    res.status(status);
    res.json({ message, data });
  }
}

module.exports = TmpController;
