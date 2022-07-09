const mongoose = require("mongoose");

//
/** ======================================================
 *  Defining nested object schemas
 *  ====================================================== */

const loanSchema = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books",
  },

  title: String,

  status: {
    type: String,
    default: "On Loan",
  },

  loandate: {
    type: Date,
    default: Date.now,
  },

  duedate: {
    type: Date,
    default: +new Date() + 21 * 24 * 60 * 60 * 1000,
  },

  returndate: {
    type: Date,
    default: "",
  },
});

const reservationSchema = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books",
  },

  title: String,

  status: String,

  latestpickup: {
    type: Date,
    default: "",
  },
});

const reviewSchema = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books",
  },

  title: String,

  rating: Number,

  comments: String,

  reviewdate: {
    type: Date,
    default: Date.now,
  },
});

//
/** ======================================================
 *  Defining schemas for the main 'Member' object
 *  ====================================================== */

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
      minLength: 8,
      validate: {
        validator: (email) => {
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        },
        message: () => `Not a valid email address`,
      },
    },

    location: {
      type: String,
      default: "-",
    },

    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 128,
    },

    profilepic: {
      type: String,
      default:
        "https://media.istockphoto.com/photos/illustration-of-smiling-happy-man-with-laptop-sitting-in-armchair-picture-id1226886130?s=612x612",
    },

    outstandingfines: {
      type: mongoose.Types.Decimal128,
      default: 0.0,
      required: true,
    },

    loans: {
      type: [loanSchema],
      default: [],
    },

    reservations: {
      type: [reservationSchema],
      default: [],
    },

    reviews: {
      type: [reviewSchema],
      default: [],
    },

    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
      required: true,
    },

    updatedAt: {
      type: Date,
      default: () => Date.now(),
      required: true,
    },
  },
  { collection: "Members" }
);

module.exports = mongoose.model("Members", memberSchema);
