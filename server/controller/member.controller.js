const ObjectId = require("mongoose").Types.ObjectId;
const memberService = require("../services/member.service");

class MemberController {
  // This is a class, which has methods:

  //
  /* ----------------------------- LOAN -----------------------------

          'viewloans()' - view all current loans
          'updateloan()' - flips loan status of book - update "on loan" TO "returned", update returned date

  //
  /* ----------------------------- HISTORY -----------------------------

          'viewhistories()' - view all histories 

 //
  /* ----------------------------- RESERVATION -----------------------------

          'createreservation()' - this is created by clicking a single-button/link on book single listing page, when ebook isnt available
          'viewreservations()' - view all current reservations 

  //
  /* ----------------------------- REVIEW -----------------------------

          'createreview()' - creates new entry for book review
          'viewreviews()' - view all reviews
          'updatereview()' - update single review - rating / comments 

  //
  /* ----------------------------- PROFILE -----------------------------

          'createprofile()' - when a new member registers on the site
          'viewprofile()' - view profile, before it gets edited 
          'updateprofile()' - update member profile - name / email / password / profile pic

  //
  /* ----------------------------- CART -----------------------------

          'viewcart()' - view all items in cart 
          'checkout()' - when member clicks checkout on the cart page, creating a new loan record


  //
  /** ======================================================
   *  Controller - GET, viewloans()
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
   *  Controller - GET, viewreservationss()
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
   *  Controller - GET, viewhistories()
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
   *  Controller - GET, viewreviews()
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
   *  Controller - GET, viewprofile()
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
   *  Controller - PUT, editprofile()
   *  ====================================================== */
  async editprofile(req, res) {
    const id = req.params.id;
    const name = req.params.name;
    const email = req.params.email;
    const pwd = req.params.pwd;
    const pic = req.params.pic;

    if (!ObjectId.isValid(id)) {
      res.status(400);
      return res.send(`Controller (Edit Profile) - Invalid member id, typeof objectId expected.`);
    }

    if (pwd < 4) {
      res.status(400);
      return res.send(`Controller (Edit Profile) - Minimum password length is 4.`);
    }

    const { status, data, message } = await memberService.editProfile(id, name, email, pwd, pic);
    res.status(status);
    res.json({ message, data });
  }
}

module.exports = MemberController;
