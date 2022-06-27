const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },
  { collection: "user" }
);

module.exports = mongoose.model("User", userSchema);
