const ObjectId = require("mongoose").Types.ObjectId;
const memberService = require("../services/member.service");

class MemberController {
  // This is a class, which has methods:

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
    const { id, bid } = req.body;

    if (!ObjectId.isValid(id) || !ObjectId.isValid(bid)) {
      res.status(400);
      return res.send(`Controller (update loans) - Invalid member id or book id, typeof objectId expected.`);
    }

    const { status, data, message } = await memberService.updateloans(id, bid);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - PUT, updatereviews()
   *  ====================================================== */

  async updatereviews(req, res) {
    const { id, rid, rrating, rcomments } = req.body;

    const rlowerbound = 0.0;
    const rupperbound = 5.0;

    if (!ObjectId.isValid(id) || !ObjectId.isValid(rid)) {
      res.status(400);
      return res.send(`Controller (update reviews) - Invalid member id or review id, typeof objectId expected.`);
    }

    if (typeof rrating != "number") {
      res.status(400);
      return res.send(`Controller (update reviews) - Invalid rating, typeof Number expected.`);
    }

    if (rrating < rlowerbound || rrating > rupperbound) {
      res.status(400);
      return res.send(`Controller (update reviews) - Invalid rating, it should fall between ${rlowerbound} - ${rupperbound}.`);
    }

    if (typeof rcomments != "string") {
      res.status(400);
      return res.send(`Controller (update reviews) - Invalid comment, typeof String expected.`);
    }

    const { status, data, message } = await memberService.updatereviews(id, rid, rrating, rcomments);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - PUT, updateprofile()
   *  ====================================================== */

  async updateprofile(req, res) {
    const { id, mname, memail, mpassword } = req.body;
    const mailformat =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!ObjectId.isValid(id)) {
      res.status(400);
      return res.send(`Controller (update profile) - Invalid member id, typeof objectId expected.`);
    }

    if (!memail.match(mailformat)) {
      res.status(400);
      return res.send(`Controller (update profile) - Invalid email, format is incorrect.`);
    }

    const { status, data, message } = await memberService.updateprofile(id, mname, memail, mpassword);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - PUT, checkout()
   *  ====================================================== */

  async checkout(req, res) {
    const { id, bid, btitle } = req.body;

    if (!ObjectId.isValid(id) || !ObjectId.isValid(bid)) {
      res.status(400);
      return res.send(`Controller (checkout) - Invalid member id or book id, typeof objectId expected.`);
    }

    if (typeof btitle != "string") {
      res.status(400);
      return res.send(`Controller (checkout) - Invalid title, typeof String expected.`);
    }

    const { status, data, message } = await memberService.checkout(id, bid, btitle);
    res.status(status);
    res.json({ message, data });
  }
}

module.exports = MemberController;
