const ObjectId = require("mongoose").Types.ObjectId;
const memberService = require("../services/member.service");

class MemberController {
  // This is a class, which has methods:
  // 'viewloans()' - view all loans
  // 'viewreservations()' - view all reservations
  // 'viewhistories()' - view all histories
  // 'viewreviews()' - view all reviews
  // 'viewprofile()' - view editable profile info
  // 'updateloans()' - update single loan status of book - refreshes "On Loan" to "Returned", refreshes "returndate" to current date
  // 'updatereviews()' - update single review - refreshes "rating" / "comments" / "reviewdate"
  // 'updateprofile()' - update member profile - refreshes "name" / "email" / "password"
  // 'checkout()' - create loan records for single or multiple items, at checkout on the cart page

  //
  /** ======================================================
   *  CONTROLLER - GET, viewloans()
   *  ====================================================== */
  async viewloans(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(400);
      return res.send(`Controller (view loans) - Invalid member id, typeof objectId expected.`);
    }

    const { status, data, message } = await memberService.viewloans(id);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - GET, viewreservations()
   *  ====================================================== */
  async viewreservations(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(400);
      return res.send(`Controller (view reservations) - Invalid member id, typeof objectId expected.`);
    }

    const { status, data, message } = await memberService.viewreservations(id);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - GET, viewhistories()
   *  ====================================================== */
  async viewhistories(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(400);
      return res.send(`Controller (view histories) - Invalid member id, typeof objectId expected.`);
    }

    const { status, data, message } = await memberService.viewhistories(id);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - GET, viewreviews()
   *  ====================================================== */
  async viewreviews(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(400);
      return res.send(`Controller (view reviews) - Invalid member id, typeof objectId expected.`);
    }

    const { status, data, message } = await memberService.viewreviews(id);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - GET, viewprofile()
   *  ====================================================== */
  async viewprofile(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(400);
      return res.send(`Controller (view profile) - Invalid member id, typeof objectId expected.`);
    }

    const { status, data, message } = await memberService.viewprofile(id);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - PUT, updateloans()
   *  ====================================================== */

  async updateloans(req, res) {
    const { id, lid, btitle } = req.body;

    if (!ObjectId.isValid(id) || !ObjectId.isValid(lid)) {
      res.status(400);
      return res.send(`Controller (update loans) - Invalid member id or loan id, typeof objectId expected.`);
    }

    if (typeof btitle != "string") {
      res.status(400);
      return res.send(`Controller (update loans) - Invalid book title, typeof String expected.`);
    }

    const { status, data, message } = await memberService.updateloans(id, lid, btitle);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - PUT, updatereviews()
   *  ====================================================== */

  async updatereviews(req, res) {
    const { id, rid, btitle, rrating, rcomments } = req.body;

    const rlowerbound = 0.0;
    const rupperbound = 5.0;

    if (!ObjectId.isValid(id) || !ObjectId.isValid(rid)) {
      res.status(400);
      return res.send(`Controller (update reviews) - Invalid member id or review id, typeof objectId expected.`);
    }

    if (rrating < rlowerbound || rrating > rupperbound) {
      res.status(400);
      return res.send(`Controller (update reviews) - Invalid rating, it should fall between ${rlowerbound} - ${rupperbound}.`);
    }

    if (typeof rrating != "number") {
      res.status(400);
      return res.send(`Controller (update reviews) - Invalid rating, typeof Number expected.`);
    }

    if (typeof btitle != "string" || typeof rcomments != "string") {
      res.status(400);
      return res.send(`Controller (update reviews) - Invalid book title or comment, typeof String expected.`);
    }

    const { status, data, message } = await memberService.updatereviews(id, rid, btitle, rrating, rcomments);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - PUT, updateprofile()
   *  ====================================================== */

  async updateprofile(req, res) {
    const { id, pname, pemail, plocation, ppassword } = req.body;
    const mailformat =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!ObjectId.isValid(id)) {
      res.status(400);
      return res.send(`Controller (update profile) - Invalid member id, typeof objectId expected.`);
    }

    if (!pemail.match(mailformat)) {
      res.status(400);
      return res.send(`Controller (update profile) - Invalid email, format is incorrect.`);
    }

    if (typeof pname != "string" || typeof pemail != "string" || typeof plocation != "string" || typeof ppassword != "string") {
      res.status(400);
      return res.send(`Controller (update profile) - Invalid name / email / location / password, typeof String expected.`);
    }

    const { status, data, message } = await memberService.updateprofile(id, pname, pemail, plocation, ppassword);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - PUT, checkout()
   *  ====================================================== */

  async checkout(req, res) {
    const cartarr = req.body;

    if (cartarr.length > 0) {
      for (let i = 0; i < cartarr.length; i++) {
        if (!ObjectId.isValid(cartarr[i].id) || !ObjectId.isValid(cartarr[i].bid)) {
          res.status(400);
          return res.send(`Controller (checkout) - Invalid member id or book id, typeof objectId expected.`);
        }

        if (typeof cartarr[i].btitle != "string") {
          res.status(400);
          return res.send(`Controller (checkout) - Invalid book title, typeof String expected.`);
        }
      }
    } else {
      if (!Array.isArray(cartarr)) {
        res.status(400);
        return res.send(`Controller (checkout) - Invalid input, objects must be braced within an array "[]".`);
      }

      res.status(400);
      return res.send(`Controller (checkout) - Invalid cart, at least one item expected.`);
    }

    const { status, data, message } = await memberService.checkout(cartarr);
    res.status(status);
    res.json({ message, data });
  }
}

module.exports = MemberController;
