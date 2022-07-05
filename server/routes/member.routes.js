const express = require("express");
const router = express.Router();

// Import the controller files
const MemberController = require("../controller/member.controller");
// Instantiate the class
const memberController = new MemberController();

//
/** ======================================================
 *  ROUTES - GET, /member, homepage for members only
 *  ====================================================== */

router.get("/member", (req, res) => {
  const msg = "Welcome to our Library (members)";

  console.log(msg);
  res.status(200).json(`Success: ${msg}`);
});

//
/** ======================================================
 *  ROUTES- GET, /member/v-loans/:id, with viewloans()
 *  ====================================================== */
router.get("/member/v-loans/:id", memberController.viewloans);

//
/** ======================================================
 *  ROUTES - GET, /member/v-reservations/:id, with viewreservations()
 *  ====================================================== */
router.get("/member/v-reservations/:id", memberController.viewreservations);

//
/** ======================================================
 *  ROUTES - GET, /member/v-histories/:id, with viewhistories()
 *  ====================================================== */
router.get("/member/v-histories/:id", memberController.viewhistories);

//
/** ======================================================
 *  ROUTES - GET, /member/v-reviews/:id, with viewreviews()
 *  ====================================================== */
router.get("/member/v-reviews/:id", memberController.viewreviews);

//
/** ======================================================
 *  ROUTES - GET, /member/v-profile/:id, with viewprofile()
 *  ====================================================== */
router.get("/member/v-profile/:id", memberController.viewprofile);

//
/** ======================================================
 *  ROUTES - PUT, /member/u-loans, updateloans()
 *  ====================================================== */
router.put("/member/u-loans/", memberController.updateloans);

//
/** ======================================================
 *  ROUTES - PUT, /member/u-reviews, updatereviews()
 *  ====================================================== */
router.put("/member/u-reviews/", memberController.updatereviews);

//
/** ======================================================
 *  ROUTES - PUT, /member/u-profile, updateprofile()
 *  ====================================================== */
router.put("/member/u-profile/", memberController.updateprofile);

//
/** ======================================================
 *  ROUTES - PUT, /member/checkout, checkout()
 *  ====================================================== */
router.put("/member/checkout/", memberController.checkout);

module.exports = router;
