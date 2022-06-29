const ObjectId = require("mongoose").Types.ObjectId;
const memberService = require("../services/member.service");

class MemberController {
  // This is a class, which has methods 'viewloans()', 'viewreservations()', 'viewhistories()', 'viewreviews()', 'viewprofile()'

  //
  /** ======================================================
   *  Controller - GET, viewloans()
   *  ====================================================== */
  async viewloans(req, res) {
    const memberId = req.params.memberid;

    if (!ObjectId.isValid(memberId)) {
      res.status(400);
      return res.send(`Controller (View Loans) - Invalid member id, typeof objectId expected.`);
    }

    const { status, data, message } = await memberService.viewloans(memberId);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  Controller - GET, viewreservationss()
   *  ====================================================== */
  async viewreservations(req, res) {
    const memberId = req.params.memberid;

    if (!ObjectId.isValid(memberId)) {
      res.status(400);
      return res.send(`Controller (View Reservations) - Invalid member id, typeof objectId expected.`);
    }

    const { status, data, message } = await memberService.viewreservations(memberId);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  Controller - GET, viewhistories()
   *  ====================================================== */
  async viewhistories(req, res) {
    const memberId = req.params.memberid;

    if (!ObjectId.isValid(memberId)) {
      res.status(400);
      return res.send(`Controller (View Histories) - Invalid member id, typeof objectId expected.`);
    }

    const { status, data, message } = await memberService.viewhistories(memberId);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  Controller - GET, viewreviews()
   *  ====================================================== */
  async viewreviews(req, res) {
    const memberId = req.params.memberid;

    if (!ObjectId.isValid(memberId)) {
      res.status(400);
      return res.send(`Controller (View Reviews) - Invalid member id, typeof objectId expected.`);
    }

    const { status, data, message } = await memberService.viewreviews(memberId);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  Controller - GET, viewprofile()
   *  ====================================================== */
  async viewprofile(req, res) {
    const memberId = req.params.memberid;

    if (!ObjectId.isValid(memberId)) {
      res.status(400);
      return res.send(`Controller (View Profile) - Invalid member id, typeof objectId expected.`);
    }

    const { status, data, message } = await memberService.viewprofile(memberId);
    res.status(status);
    res.json({ message, data });
  }
}

module.exports = MemberController;
