const mongoose = require("mongoose");
const Member = require("../model/Member");
const fs = require("fs");
const fsMember = fs.readFileSync("server/demodata/dd-members.json");
const fsMemberJSON = JSON.parse(fsMember);

module.exports = {
  //
  /** ======================================================
   *  SERVICE - GET "POST", addmembers()
   *  ====================================================== */
  addmembers: async () => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const getmembers = await Member.find({ _id: fsMemberJSON });

    if (!getmembers.length) {
      const created = await Member.create(fsMemberJSON);

      const msg = "list of members ADDED successfully to database.";
      console.log("\nAdmin Console - " + msg);

      created.forEach((e) => {
        console.log(`\nName: ${e.name}\nEmail: ${e.email}\nLocation: ${e.location}\n--------------------------------`);
      });

      result.status = 200;
      result.message = "Admin Message - " + msg;
      result.data = created;

      return result;
    }
    const msg = "unable to ADD, one or more members already EXISTS in the database.";
    console.log("\nAdmin Console - " + msg);

    result.status = 404;
    result.message = "Admin Message - " + msg;
    return result;
  },

  //
  /** ======================================================
   *  SERVICE - GET "DELETE", deletemembers()
   *  ====================================================== */
  deletemembers: async () => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    let exists = false;
    const collections = await mongoose.connection.db.listCollections().toArray();

    collections.forEach((e) => {
      e.name === "Members" ? (exists = true) : exists;
    });

    if (!exists) {
      const msg = "(Members) collection NOT in database.";
      console.log("\nAdmin Console - " + msg);

      result.status = 404;
      result.message = "Admin Message - " + msg;
      return result;
    }

    let arr = [];
    const getmembers = await Member.find({ _id: fsMemberJSON });

    if (getmembers.length) {
      await Member.deleteMany({ _id: getmembers });

      const msg = "list of members DELETED successfully from database.";
      console.log("\nAdmin Console - " + msg);

      getmembers.forEach((e) => {
        arr.push(e.name, e.email);
        console.log(`\nName: ${e.name}\nEmail: ${e.email}\nLocation: ${e.location}\n--------------------------------`);
      });

      result.status = 200;
      result.message = "Admin Message - " + msg;
      result.data = arr;

      return result;
    } else {
      const msg = "unable to DELETE, one or more members NOT in the database.";
      console.log("\nAdmin Console - " + msg);

      result.status = 404;
      result.message = "Admin Message - " + msg;
      return result;
    }
  },

  //
  /** ======================================================
   *  SERVICE - GET "POST" & GET "DELETE", resetmembers()
   *  ====================================================== */
  resetmembers: async (delm, addm) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const msg = "RESET of demo data complete.";
    console.log("\nAdmin Console - " + msg);

    result.status = 200;
    result.message = "Admin Message - " + msg;
    return result;
  },
};
