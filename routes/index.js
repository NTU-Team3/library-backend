const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors()); // enable cors

app.use(express.json()); // Enable express to parse JSON as request body.
app.use(express.urlencoded({ extended: false }));

const publicRoutes = require("./public");
const authRoutes = require("./auth");

app.use(publicRoutes);
app.use(authRoutes);

module.exports = app;
