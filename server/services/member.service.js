const Member = require("../model/Member");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  /*
   'viewloans' - SERVICE
  */
  viewloans: async (id) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const lnmember = await Member.find({ _id: id });

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
          "loans.duedate": 1,
          "loans.startdate": 1,
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

  /*
   'viewreservatioms' - SERVICE
  */
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

  /*
     'viewhistories' - SERVICE
    */
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

  /*
   'viewreviews' - SERVICE
  */

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

  /*
   'viewprofile' - SERVICE
  */
  viewprofile: async (id) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const pfrecords = await Member.find({ _id: id }, "name email password profilepic outstandingfines");

    if (!pfrecords.length) {
      const msg = "PROFILE doesnt exists in database.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const msg = "view PROFILE.";
    console.log("\nMember Console - " + msg);
    console.log(...pfrecords);

    result.status = 200;
    result.message = "Member Message - " + msg;
    result.data = pfrecords;

    return result;
  },
};
