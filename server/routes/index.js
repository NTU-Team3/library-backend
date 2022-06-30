const express = require("express");
const app = express(); // start a server

// Import libraries for handling HTTP errors
const createError = require("http-errors");

const cors = require("cors");
app.use(cors()); // enable cors

app.use(express.json()); // Enable express to parse JSON as request body (payload).

app.use(express.urlencoded({ extended: false }));

/* Specify all the 1st-level routes here */
const publicRoutes = require("./public.routes");
app.use(publicRoutes);

const memberRoutes = require("./member.routes");
app.use(memberRoutes);

const adminRoutes = require("./admin.routes");
app.use(adminRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);
  res.json(createError(404));
});

module.exports = app;
