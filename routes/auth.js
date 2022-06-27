const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.put("/signup", () => {
  const user = new User({
    email: "test@email.com",
    name: "name",
  });

  return user
    .save()
    .then((result) => {
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});
module.exports = router;
