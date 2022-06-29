const Member = require("../model/Member");

module.exports = {
  //
  /** ======================================================
   *  Service - GET all loans of member
   *  ====================================================== */
  viewloans: async (memberId) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    // fetch all current loans matching memberid from database
    const currLoans = await Member.findById(memberId, "name").exec();

    if (!Member) {
      result.status = 404;
      result.message = "The database has not been setup.";
      return result;
    }

    // error handling
    if (!currLoans) {
      result.status = 404;
      result.message = "You have no current loans.";
      return result;
    }

    console.log("List of current loans.");
    console.log(currLoans);

    result.status = 200;
    result.message = "List of current loans.";
    result.data = currLoans;

    return result;
  },

  //
  /** ======================================================
   *  Service - returns all reservations of member
   *  ====================================================== */

  //
  /** ======================================================
   *  Service - returns all histories of member
   *  ====================================================== */

  //
  /** ======================================================
   *  Service - returns all reviews of member
   *  ====================================================== */

  //
  /** ======================================================
   *  Service - returns profile of member for updating purposes
   *  ====================================================== */
};
