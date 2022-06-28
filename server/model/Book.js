const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      default: [],
    },
    author: {
      type: [String],
      default: [],
    },
    language: {
      type: String,
    },
    pubdate: {
      type: Date,
    },

    isbn10: {
      type: String,
    },
    isbn13: {
      type: String,
    },
    rating: {
      type: Number,
    },
    globalrating: {
      type: Number,
    },
    pages: {
      type: Number,
    },
    reviews: {
      type: [String],
      default: [],
    },
  },
  { collection: "Books" }
);

module.exports = mongoose.model("Books", bookSchema);
