/*





<<< TMP SERVICE >>> FOR AUTHENTICATION ROUTE
Please update to your setup & requirements






*/
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const Member = require("../model/Member");

module.exports = {
  //
  /** ======================================================
   *  SERVICE - POST, register()
   *  ====================================================== */
  register: async (rname, remail, rpassword) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    // Only unique emails are allowed during registration & update profile
    // .exists returns either null or ObjectId(_id)
    const emailexist = await Member.exists({ email: remail });

    if (emailexist === null) {
      // JWT and hashing etc occurs here, before hashed member password is input into database
      const created = await Member.create([
        {
          name: rname,
          email: remail,
          password: rpassword,
        },
      ]);

      const msg = "REGISTRATION SUCCESSFUL.";
      console.log("\nMember Console - " + msg);
      console.log(`\nname: ${created[0].name}\nemail: ${created[0].email}\n`);

      result.status = 200;
      result.message = "Member Message - " + msg;
      result.data = created[0]._id;

      return result;
    }

    const msg = "REGISTRATION FAILED. An existing account with this email found, pls register with another email.";
    console.log("\nMember Console - " + msg);
    console.log(`email: ${remail}\n`);

    result.status = 404;
    result.message = "Member Message - " + msg;
    result.data = remail;

    return result;
  },

  //
  /** ======================================================
   *  SERVICE - POST, login()
   *  ====================================================== */

  login: async (lemail, lpassword) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const emailexist = await Member.exists({ email: lemail });

    if (emailexist) {
      // Checking email against password occurs here, with JWT and hashing etc

      const msg = "LOGIN SUCCESSFUL.";
      console.log("\nMember Console - " + msg);
      console.log(`\nname: ${"member name member name member name"}\nemail: ${"member email member email member email"}\n`);

      result.status = 200;
      result.message = "Member Message - " + msg;
      result.data = emailexist;

      return result;
    }

    const msg = "LOGIN FAILED. No account with this email found.";
    console.log("\nMember Console - " + msg);
    console.log(`email: ${lemail}\n`);

    result.status = 404;
    result.message = "Member Message - " + msg;
    result.data = lemail;

    return result;
  },
};
