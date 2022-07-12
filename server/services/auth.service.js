const mongoose = require("mongoose");
const Member = require("../model/Member");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

module.exports = {
  /**
   * business logic for registering new members
   */

  register: async (username, email, plainTextPassword) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const password = await bcrypt.hash(plainTextPassword, 10);

    try {
      const response = await Member.create([
        {
          name: username,
          email: email,
          password: password,
        },
      ]);
      console.log("User created successfully: ", response);
      result.status = 201;
      result.message = `User ${username} successfully created!`;
      result.data = response;
      return result;
    } catch (error) {
      if (error.code === 11000) {
        // duplicate key
        console.log(`email: ${email} already in use!`);
        result.status = 412;
        result.message = `email: ${email} already in use!`;
        return result;
      }
      throw error;
    }
  },

  /**
   * business logic for user authentifcation using email and password
   * @param: email
   * @param: password
   */

  login: async (email, password) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const user = await Member.findOne({ email }).lean();

    console.log("user info is", user);

    // check does user exist
    if (!user) {
      result.status = 401;
      result.message =
        "Invalid email or password. Authentification unsuccessful!";
      console.log(
        `user ${email}, error: ${result.status}, message: ${result.message} `
      );
      return result;
    }

    if (await bcrypt.compare(password, user.password)) {
      // the email, password combination is successful

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        JWT_SECRET
      );
      (result.status = 200),
        (result.data = token),
        (result.message = "Sign in successful.");
      return result;
    }
    // wrong password
    (result.status = 401),
      (result.message =
        "Invalid email or password. Authentification unsuccessful!");
    return result;
  },
};
