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
      return res.send(`Controller (View Loans) - Invalid member id, typeof objectId expected.`);
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
      return res.send(`Controller (View Reservations) - Invalid member id, typeof objectId expected.`);
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
      return res.send(`Controller (View Histories) - Invalid member id, typeof objectId expected.`);
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
      return res.send(`Controller (View Reviews) - Invalid member id, typeof objectId expected.`);
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
      return res.send(`Controller (View Profile) - Invalid member id, typeof objectId expected.`);
    }

    const { status, data, message } = await memberService.viewprofile(id);
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
      return res.send(`Controller (Update Profile) - Invalid member id, typeof objectId expected.`);
    }

    if (!memail.match(mailformat)) {
      res.status(400);
      return res.send(`Controller (Update Profile) - Invalid format for email address.`);
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
      return res.send(`Controller (Checkout) - Invalid member id or book id, typeof objectId expected.`);
    }

    if (typeof booktitle != "string") {
      res.status(400);
      return res.send(`Controller (Checkout) - Invalid title, typeof String expected.`);
    }

    const { status, data, message } = await memberService.checkout(id, bid, btitle);
    res.status(status);
    res.json({ message, data });
  }
}

module.exports = MemberController;
