const express = require("express");
const router = express.Router();

// Import the controller files
const MemberController = require("../controller/member.controller");
// Instantiate the class
const memberController = new MemberController();

//
/** ======================================================
 *  Endpoint Routes - GET, /member, homepage for members only
 *  ====================================================== */

router.get("/member", (req, res) => {
  const msg = "Welcome to our Library (members)";

  console.log(msg);
  res.status(200).json(`Success: ${msg}`);
});

//
/** ======================================================
 *  Endpoint Routes - GET, /member/v-loans, with viewloans()
 *  ====================================================== */
router.get("/member/v-loans/:memberid", memberController.viewloans);

//
/** ======================================================
 *  Endpoint Routes - GET, /member/v-reservations, with viewreservations()
 *  ====================================================== */
router.get("/member/v-reservations/:memberid", memberController.viewreservations);

//
/** ======================================================
 *  Endpoint Routes - GET, /member/v-histories, with viewhistories()
 *  ====================================================== */
router.get("/member/v-histories/:memberid", memberController.viewhistories);

//
/** ======================================================
 *  Endpoint Routes - GET, /member/v-reviews, with viewreviews()
 *  ====================================================== */
router.get("/member/v-reviews/:memberid", memberController.viewreviews);

//
/** ======================================================
 *  Endpoint Routes - GET, /member/v-profile, with viewprofile()
 *  ====================================================== */
router.get("/member/v-profile/:memberid", memberController.viewprofile);

module.exports = router;
