const express = require("express");
const router = express.Router();

router.get("/about", (req, res) => {
  res.json("Welcome to Library!");
});

module.exports = router;
