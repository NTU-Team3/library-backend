const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const Member = require("../model/Member");
const Book = require("../model/Book");
const { json } = require("express");

module.exports = {
  //
  /** ======================================================
   *  SERVICE - GET, viewloans()
   *  ====================================================== */
  viewloans: async (id) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const lnmember = await Member.find({ _id: id });
    console.log(lnmember);

    if (!lnmember.length) {
      const msg = "PROFILE doesnt exists in database.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const lnrecords = await Member.aggregate([
      { $match: { _id: ObjectId(id) } },
      { $unwind: "$loans" },
      { $match: { "loans.status": "On Loan" } },
      {
        $project: {
          _id: 1,
          name: 1,
          "loans.status": 1,
          "loans.book_id": 1,
          "loans.title": 1,
          "loans.loandate": 1,
          "loans.duedate": 1,
        },
      },
    ]);

    if (!lnrecords.length) {
      const msg = "there are no current LOANS.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const msg = "list of current LOANS.";
    console.log("\nMember Console - " + msg);
    console.log(...lnrecords);

    result.status = 200;
    result.message = "Member Message - " + msg;
    result.data = lnrecords;

    return result;
  },

  //
  /** ======================================================
   *  SERVICE - GET, viewreservations()
   *  ====================================================== */
  viewreservations: async (id) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const rsmember = await Member.find({ _id: id });

    if (!rsmember.length) {
      const msg = "PROFILE doesnt exists in database.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const rsrecords = await Member.aggregate([
      { $match: { _id: ObjectId(id) } },
      { $unwind: "$reservations" },
      {
        $project: {
          _id: 1,
          name: 1,
          "reservations.title": 1,
          "reservations.status": 1,
          "reservations.latestpickup": 1,
        },
      },
    ]);

    if (!rsrecords.length) {
      const msg = "there are no current RESERVATIONS.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const msg = "list of current RESERVATIONS.";
    console.log("\nMember Console - " + msg);
    console.log(...rsrecords);

    result.status = 200;
    result.message = "Member Message - " + msg;
    result.data = rsrecords;

    return result;
  },

  //
  /** ======================================================
   *  SERVICE - GET, viewhistories()
   *  ====================================================== */
  viewhistories: async (id) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const hsmember = await Member.find({ _id: id });

    if (!hsmember.length) {
      const msg = "PROFILE doesnt exists in database.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const hsrecords = await Member.aggregate([
      { $match: { _id: ObjectId(id) } },
      { $unwind: "$loans" },
      { $match: { "loans.status": "Returned" } },
      {
        $project: {
          _id: 1,
          name: 1,
          "loans.status": 1,
          "loans.book_id": 1,
          "loans.title": 1,
          "loans.duedate": 1,
          "loans.startdate": 1,
        },
      },
    ]);

    if (!hsrecords.length) {
      const msg = "there are no HISTORIES.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const msg = "list of HISTORIES.";
    console.log("\nMember Console - " + msg);
    console.log(...hsrecords);

    result.status = 200;
    result.message = "Member Message - " + msg;
    result.data = hsrecords;

    return result;
  },

  //
  /** ======================================================
   *  SERVICE - GET, viewreviews())
   *  ====================================================== */

  viewreviews: async (id) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const rvmember = await Member.find({ _id: id });

    if (!rvmember.length) {
      const msg = "PROFILE doesnt exists in database.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const rvrecords = await Member.aggregate([
      { $match: { _id: ObjectId(id) } },
      { $unwind: "$reviews" },
      {
        $project: {
          _id: 1,
          name: 1,
          "reviews.title": 1,
          "reviews.rating": 1,
          "reviews.comments": 1,
          "reviews.reviewdate": 1,
        },
      },
    ]);

    if (!rvrecords.length) {
      const msg = "there are no current REVIEWS.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const msg = "list of current REVIEWS.";
    console.log("\nMember Console - " + msg);
    console.log(...rvrecords);

    result.status = 200;
    result.message = "Member Message - " + msg;
    result.data = rvrecords;

    return result;
  },

  //
  /** ======================================================
   *  SERVICE - GET, viewprofile()
   *  ====================================================== */
  viewprofile: async (id) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const pfrecord = await Member.findById(id, "name email password");

    if (!pfrecord.length) {
      const msg = "PROFILE doesnt exists in database.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const msg = "view PROFILE.";
    console.log("\nMember Console - " + msg);
    console.log(...pfrecord);

    result.status = 200;
    result.message = "Member Message - " + msg;
    result.data = pfrecord;

    return result;
  },

  //
  /** ======================================================
   *  SERVICE - PUT, updateprofile()
   *  ====================================================== */

  updateprofile: async (id, mname, memail, mpassword) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const filter = { _id: id };
    const pfmember = await Member.find(filter);

    if (!pfmember.length) {
      const msg = "PROFILE doesnt exists in database.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    } else {
      const updatefields = {
        name: mname,
        email: memail,
        password: mpassword,
      };

      await Member.findByIdAndUpdate(filter, updatefields);

      const msg = "member PROFILE update SUCCESSFUL.";
      console.log("\nAdmin Console - " + msg + "\n");
      console.log(`Updated Name: ${mname}`);
      console.log(`Updated Email: ${memail}`);
      console.log(`Updated Password: ${mpassword}`);

      result.status = 200;
      result.message = "Admin Message - " + msg;
      result.data = `Updated Name: ${mname}     Updated Email: ${memail}`;

      return result;
    }
  },

  //
  /** ======================================================
   *  SERVICE - PUT, checkout()
   *  ====================================================== */
  checkout: async (id, bid, btitle) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const filter = { _id: id };
    const lnmember = await Member.find(filter);
    const lnbook = await Book.find({ _id: bid });

    if (!lnmember.length || !lnbook.length) {
      const msg = "PROFILE or BOOK doesnt exists in database.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    } else {
      // Would have used $push or $addToSet, however these are not available in free-tier of Mongo Atlas
      const createobj = {
        _id: new mongoose.mongo.ObjectId(),
        book_id: bid,
        title: btitle,
      };

      let lnrecords = await Member.aggregate([
        { $match: { _id: ObjectId(id) } },
        { $unwind: "$loans" },
        {
          $project: {
            _id: 1,
            "loans._id": 1,
            "loans.book_id": 1,
            "loans.title": 1,
            "loans.status": 1,
            "loans.loandate": 1,
            "loans.duedate": 1,
            "loans.returndate": 1,
          },
        },
      ]);

      const queryLen = lnrecords.length;

      lnrecords.forEach((element) => {
        // Destructuring complex objects
        const { _id: d1_id, loans: d2_loans } = element;
        const {
          _id: d2_loans_id,
          book_id: d2_loans_bookid,
          title: d2_loans_title,
          status: d2_loans_status,
          loandate: d2_loans_loand,
          duedate: d2_loans_dued,
          returndate: d2_loans_returnd,
        } = d2_loans;

        // Adding the same records back, as simplified objects so $set recognizes it later
        lnrecords.push({
          _id: d2_loans_id,
          book_id: d2_loans_bookid,
          title: d2_loans_title,
          status: d2_loans_status,
          loandate: d2_loans_loand,
          duedate: d2_loans_dued,
          returndate: d2_loans_returnd,
        });
      });

      // Adding single item from cart
      lnrecords.push(createobj);

      // Removes the complex objects for reinsertion
      lnrecords.splice(0, queryLen);

      await Member.findByIdAndUpdate(filter, { $set: { loans: lnrecords } });

      const msg = "member LOAN is SUCCESSFUL.";
      console.log("\nAdmin Console - " + msg);
      console.log(`Item loaned: "${btitle}"`);

      result.status = 200;
      result.message = "Admin Message - " + msg;
      result.data = createobj;

      return result;
    }
  },
};
