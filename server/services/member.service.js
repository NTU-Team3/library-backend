const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const Member = require("../model/Member");
const Book = require("../model/Book");

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

    const filter = { _id: id };
    const fields = "_id name";
    const lnmember = await Member.find(filter, fields);

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
          "loans._id": 1,
          "loans.status": 1,
          "loans.book_id": 1,
          "loans.title": 1,
          "loans.loandate": 1,
          "loans.duedate": 1,
        },
      },
      {
        $sort: {
          "loans.duedate": 1,
        },
      },
    ]);

    if (!lnrecords.length) {
      const msg = "there are no current LOANS.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;
      result.data = lnmember;

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

    const filter = { _id: id };
    const fields = "_id name";
    const rsmember = await Member.find(filter, fields);

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
          "reservations._id": 1,
          "reservations.title": 1,
          "reservations.status": 1,
          "reservations.latestpickup": 1,
        },
      },
      {
        $sort: {
          "reservations.latestpickup": -1,
        },
      },
    ]);

    if (!rsrecords.length) {
      const msg = "there are no current RESERVATIONS.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;
      result.data = rsmember;

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

    const filter = { _id: id };
    const fields = "_id name";
    const hsmember = await Member.find(filter, fields);

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
          "loans._id": 1,
          "loans.status": 1,
          "loans.book_id": 1,
          "loans.title": 1,
          "loans.loandate": 1,
          "loans.duedate": 1,
          "loans.returndate": 1,
        },
      },
      {
        $sort: {
          "loans.returndate": -1,
        },
      },
    ]);

    if (!hsrecords.length) {
      const msg = "there are no HISTORIES.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;
      result.data = hsmember;

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
   *  SERVICE - GET, viewreviews()
   *  ====================================================== */

  viewreviews: async (id) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const filter = { _id: id };
    const fields = "_id name";
    const rvmember = await Member.find(filter, fields);

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
          "reviews._id": 1,
          "reviews.title": 1,
          "reviews.rating": 1,
          "reviews.comments": 1,
          "reviews.reviewdate": 1,
        },
      },
      {
        $sort: {
          "reviews.reviewdate": -1,
        },
      },
    ]);

    if (!rvrecords.length) {
      const msg = "there are no current REVIEWS.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;
      result.data = rvmember;

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

    const filter = { _id: id };
    const fields = "name email location password profilepic";
    const pfrecord = await Member.find(filter, fields);

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
   *  SERVICE - PUT, updateloans()
   *  ====================================================== */

  updateloans: async (id, lid) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const filter = { _id: id };
    const fields = "_id name";
    const lstatus = "Returned";
    const lmember = await Member.find(filter, fields);

    if (!lmember.length) {
      const msg = "PROFILE doesnt exists in database.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const lrecords = await Member.aggregate([{ $match: { _id: ObjectId(id) } }, { $unwind: "$loans" }, { $match: { "loans._id": ObjectId(lid) } }]);

    if (!lrecords.length) {
      const msg = `this LOAN '${lid}' from member '${id}' does NOT EXIST in the database.`;
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const updated = await Member.findOneAndUpdate(
      filter,
      {
        $set: {
          "loans.$[lid].status": lstatus,
          "loans.$[lid].returndate": new Date(),
        },
      },
      {
        arrayFilters: [{ "lid._id": ObjectId(lid) }],
        returnDocument: "after",
      }
    );

    const utitle = updated.loans[0].title;
    const ustatus = updated.loans[0].status;
    const ureturndate = updated.loans[0].returndate;

    const msg = `LOAN return SUCCESSFUL for '${lmember[0].name}'.`;
    console.log("\nMember Console - " + msg);
    console.log(`\nTitle: ${utitle}\nStatus: ${ustatus}\nReturn date: ${ureturndate}`);

    result.status = 200;
    result.message = "Member Message - " + msg;
    result.data = `Title: ${utitle}          Status: ${ustatus}          Return date: ${ureturndate}`;

    return result;
  },

  //
  /** ======================================================
   *  SERVICE - PUT, updatereviews()
   *  ====================================================== */
  updatereviews: async (id, rid, btitle, rrating, rcomments) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const filter = { _id: id };
    const fields = "_id name";
    const rvmember = await Member.find(filter, fields);

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
      { $match: { "reviews._id": ObjectId(rid) } },
    ]);

    if (!rvrecords.length) {
      const msg = `this REVIEW '${rid}' from member '${id}' does NOT EXIST in the database.`;
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;

      return result;
    }

    const updated = await Member.findOneAndUpdate(
      filter,
      {
        $set: {
          "reviews.$[rid].rating": rrating,
          "reviews.$[rid].comments": rcomments,
          "reviews.$[rid].reviewdate": new Date(),
        },
      },
      {
        arrayFilters: [{ "rid._id": ObjectId(rid) }],
        returnDocument: "after",
      }
    );

    const urating = updated.reviews[0].rating;
    const ucomments = updated.reviews[0].comments;
    const ureviewdate = updated.reviews[0].reviewdate;

    const msg = `REVIEW update SUCCESSFUL for '${rvmember[0].name}'.`;
    console.log("\nMember Console - " + msg);
    console.log(`\nTitle: ${btitle}\nUpdated rating: ${urating}\nUpdated comments: ${ucomments}\nUpdated review date: ${ureviewdate}`);

    result.status = 200;
    result.message = "Member Message - " + msg;
    result.data = `Title: ${btitle}          Updated rating: ${urating}          Updated comments: ${ucomments}          Updated review date: ${ureviewdate}`;

    return result;
  },

  //
  /** ======================================================
   *  SERVICE - PUT, updateprofile()
   *  ====================================================== */

  updateprofile: async (id, pname, pemail, plocation, ppassword) => {
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
      const emaildb = pfmember[0].email;
      let proceed = false;

      // The below checks if the new email input corresponds any other email in the database
      if (emaildb !== pemail) {
        const emailexist = await Member.exists({ email: pemail });

        if (emailexist === null) {
          proceed = true;
        }
      }

      if (emaildb === pemail || proceed === true) {
        const updatefields = {
          name: pname,
          email: pemail,
          location: plocation,
          password: ppassword,
        };

        const updated = await Member.findByIdAndUpdate(filter, updatefields, { returnDocument: "after" });

        const uname = updated.name;
        const uemail = updated.email;
        const ulocation = updated.location;
        const upassword = updated.password;

        const msg = "PROFILE update SUCCESSFUL.";
        console.log("\nMember Console - " + msg + "\n");
        console.log(`Updated name: ${uname}\nUpdated email: ${uemail}\nUpdated location: ${ulocation}\nUpdated Password: ${upassword}`);

        result.status = 200;
        result.message = "Member Message - " + msg;
        result.data = `Updated name: ${uname}          Updated email: ${uemail}          Updated location: ${ulocation}`;

        return result;
      }

      const msg = "PROFILE update FAILED. An existing account with this email found, pls update with another email.";
      console.log("\nMember Console - " + msg);
      console.log(`Email: ${pemail}\n`);

      result.status = 404;
      result.message = "Member Message - " + msg;
      result.data = pemail;

      return result;
    }
  },

  //
  /** ======================================================
   *  SERVICE - PUT, checkout()
   *  ====================================================== */
  checkout: async (cartarr) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    if (cartarr.length > 0) {
      const titlearr = [];
      const dataarr = [];
      let name = "";

      for (let i = 0; i < cartarr.length; i++) {
        const id = cartarr[i].id;
        const bid = cartarr[i].bid;
        const btitle = cartarr[i].btitle;

        const filter = { _id: id };
        const fields = "_id name";
        const lnmember = await Member.find(filter, fields);
        const lnbook = await Book.find({ _id: bid });
        name = lnmember[0].name;

        if (!lnmember.length || !lnbook.length) {
          const msg = "PROFILE or BOOK doesnt exists in database.";
          console.log("\nMember Console - " + msg);

          result.status = 404;
          result.message = "Member Message - " + msg;
          return result;
        } else {
          // Would have used $push or $addToSet, however these are not available in free-tier of Mongo Atlas
          // Below is the workaround solution proposed:

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
                name: 1,
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

          // Query the original length of array, before we start tweaking it
          const queryLen = lnrecords.length;

          lnrecords.forEach((element) => {
            // Destructuring complex objects
            const { _id: d1_id, name: d2_name, loans: d3_loans } = element;
            const {
              _id: d3_loans_id,
              book_id: d3_loans_bookid,
              title: d3_loans_title,
              status: d3_loans_status,
              loandate: d3_loans_loand,
              duedate: d3_loans_dued,
              returndate: d3_loans_returnd,
            } = d3_loans;

            // Adding the same records back, as simplified objects so $set recognizes it later
            lnrecords.push({
              _id: d3_loans_id,
              book_id: d3_loans_bookid,
              title: d3_loans_title,
              status: d3_loans_status,
              loandate: d3_loans_loand,
              duedate: d3_loans_dued,
              returndate: d3_loans_returnd,
            });
          });

          // Removes the complex objects for reinsertion, these are currently "unwanted duplicates"
          lnrecords.splice(0, queryLen);

          // Adding single new loan item from cart[i]
          lnrecords.push(createobj);

          await Member.findByIdAndUpdate(filter, { $set: { loans: lnrecords } });

          titlearr.push(btitle);
          dataarr.push(createobj);
        }
      }
      const msg = `member LOAN is SUCCESSFUL for '${name}'.`;
      console.log("\nMember Console - " + msg);
      console.log(`Item/s loaned:\n\n- ${titlearr.join("\n- ")}`);

      result.status = 200;
      result.message = "Member Message - " + msg;
      result.data = dataarr;

      return result;
    } else {
      const msg = "CHECKOUT transcation FAILED, no items were carted out.";
      console.log("\nMember Console - " + msg);

      result.status = 404;
      result.message = "Member Message - " + msg;
      result.data = null;

      return result;
    }
  },
};
