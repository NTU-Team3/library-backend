const express = require("express");
// Import the controller files
const PublicController = require("../controller/public.controller");
// Instantiate the class
const publicController = new PublicController();

const router = express.Router();

// Import libraries for handling HTTP errors
const createError = require("http-errors");

/* Home Page */
router.get("/", (req, rest) => {
  let info = {};
  info.message = "Welcome to our Library";
  rest.json(info);
});

/*router.get("/public", (req, res) => {
  let info = {};
  info.message = "You have called a public route!";
  res.json(info);
});*/

// POST /public/
router.get("/public", publicController.allbooks);

// GET /public/new releases
router.get("/public/newreleases", publicController.newreleases);

// GET /public/top rated
router.get("/public/toprated", publicController.toprated);

// GET /public/bookdetail/:bookid,
router.get("/public/bookdetail/:bookid", publicController.bookdetail);

module.exports = router;

