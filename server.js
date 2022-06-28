const express = require("express");
//const router = require("./routes/");
const dotenv = require("dotenv");
const path = require("path");
//const mongoose = require("mongoose");
const connectDB = require("./server/database/connection");

const app = express();

//dotenv.config();

/*const username = encodeURIComponent("royston");
const password = encodeURIComponent(process.env.MongoPW);*/

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3000;

// mongodb connection
connectDB();

/*const uri = `mongodb+srv://${username}:${password}@libray.ikse0.mongodb.net/?retryWrites=true&w=majority`;

"mongodb+srv://Admin:Gr0up3@cluster0.wtyju.mongodb.net/Library?retryWrites=true&w=majority"

mongoose
  .connect(uri)
  .then((result) => {
    router.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
*/
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
