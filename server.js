//const express = require("express");
//const router = require("./server/routes");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./server/database/connection");
//const express = require("express");

//const app = express();

const router = require("./server/routes");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 5000;

// mongodb connection
connectDB();

// set up server to accept json in payload
//app.use(express.json());

router.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
