const Member = require("../model/Member");

module.exports = {
  /*
   'viewloans' - SERVICE
  */
  viewloans: async (memberId) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    //     const loanrecords = await Member.where("_id").equals(memberId).where("loans.status").equals(lstatus).select("loans.status loans.title loans.duedate");

    const lstatus = "on loan";
    const lrecords = await Member.where("_id")
      .equals(memberId)
      .where("loans.status")
      .equals(lstatus)
      .select("loans.status loans.title loans.duedate");

    if (!lrecords.length) {
      const msg = "there are no current LOANS.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const msg = "list of current LOANS.";
    console.log("\nMember Console - " + msg);
    console.log(...lrecords);

    result.status = 200;
    result.message = "Member Message - " + msg;
    result.data = lrecords;

    return result;
  },

  /*
   'viewreservatioms' - SERVICE
  */
  viewreservations: async (memberId) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const rrecords = await Member.find({ _id: memberId }, "reservations.title reservations.status reservations.latestpickup");

    if (!rrecords.length) {
      const msg = "there are no current RESERVATIONS.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const msg = "list of current RESERVATIONS.";
    console.log("\nMember Console - " + msg);
    console.log(...rrecords);

    result.status = 200;
    result.message = "Member Message - " + msg;
    result.data = rrecords;

    return result;
  },

  /*
     'viewhistories' - SERVICE
    */
  viewhistories: async (memberId) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const hstatus = "returned";
    const hrecords = await Member.where("_id")
      .equals(memberId)
      .where("loans.status")
      .equals(hstatus)
      .select("loans.status loans.title loans.duedate");

    if (!hrecords.length) {
      const msg = "there are no HISTORIES.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const msg = "list of HISTORIES.";
    console.log("\nMember Console - " + msg);
    console.log(...hrecords);

    result.status = 200;
    result.message = "Member Message - " + msg;
    result.data = hrecords;

    return result;
  },

  /*
   'viewreviews' - SERVICE
  */

  viewreviews: async (memberId) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const rrecords = await Member.find({ _id: memberId }, "reviews.title reviews.rating reviews.comments reviews.reviewdate");

    if (!rrecords.length) {
      const msg = "there are no current REVIEWS.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const msg = "list of current REVIEWS.";
    console.log("\nMember Console - " + msg);
    console.log(...rrecords);

    result.status = 200;
    result.message = "Member Message - " + msg;
    result.data = rrecords;

    return result;
  },

  /*
   'viewprofile' - SERVICE
  */
  viewprofile: async (memberId) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const precords = await Member.find({ _id: memberId }, "name email password profilepic outstandingfines");

    if (!precords.length) {
      const msg = "PROFILE doesnt exists in database.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const msg = "view PROFILE.";
    console.log("\nMember Console - " + msg);
    console.log(...precords);

    result.status = 200;
    result.message = "Member Message - " + msg;
    result.data = precords;

    return result;
  },
};
