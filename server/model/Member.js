const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilepic: {
      type: String,
    },

    loans: {
      type: [String],
      default: [],
    },

    reservations: {
      type: [String],
      default: [],
    },

    histories: {
      type: [String],
      default: [],
    },

    reviews: {
      type: [String],
      default: [],
    },
  },
  { collection: "Members" }
);

module.exports = mongoose.model("Members", memberSchema);
