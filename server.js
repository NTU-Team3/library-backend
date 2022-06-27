const router = require("./routes/");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const username = encodeURIComponent("royston");
const password = encodeURIComponent(process.env.MongoPW);

const PORT = process.env.PORT || 3000;
const uri = `mongodb+srv://${username}:${password}@libray.ikse0.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then((result) => {
    router.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
