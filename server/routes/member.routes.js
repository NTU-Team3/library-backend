const express = require("express");
const router = express.Router();

// Import the controller files
const MemberController = require("../controller/member.controller");
// Instantiate the class
const memberController = new MemberController();

//
/** ======================================================
 *  Endpoint Routes - GET, /member, no methods currently
 *  ====================================================== */

router.get("/member", (req, res) => {
  const msg = "You called a /member route.";

  console.log(msg);
  res.status(200).json(`Success: ${msg}`);
});

//
/** ======================================================
 *  Endpoint Routes - GET, /member/vloans, with viewloans()
 *  ====================================================== */
router.get("/member/vloans/:memberid", memberController.viewloans);

//
/** ======================================================
 *  Endpoint Routes - GET, /member/vreservations, with viewreservations()
 *  ====================================================== */
router.get("/member/vreservations/:memberid", memberController.viewreservations);

//
/** ======================================================
 *  Endpoint Routes - GET, /member/vhistories, with viewhistories()
 *  ====================================================== */
router.get("/member/vhistories/:memberid", memberController.viewhistories);

//
/** ======================================================
 *  Endpoint Routes - GET, /member/vreviews, with viewreviews()
 *  ====================================================== */
router.get("/member/vreviews/:memberid", memberController.viewreviews);

//
/** ======================================================
 *  Endpoint Routes - GET, /member/vprofile, with viewprofile()
 *  ====================================================== */
router.get("/member/vprofile/:memberid", memberController.viewprofile);

module.exports = router;
