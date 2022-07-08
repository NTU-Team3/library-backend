/*





<<< TMP ROUTES >>> FOR AUTHENTICATION ROUTE
Please update to your setup & requirements






*/
const express = require("express");
const router = express.Router();

// Import the controller files
const TmpController = require("../controller/tmp.controller");
// Instantiate the class
const tmpController = new TmpController();

//
/** ======================================================
 *  ROUTES - GET, /tmp, homepage for tmp only
 *  ====================================================== */

router.get("/tmp", (req, res) => {
  const msg = "Welcome to our Library (tmp)";

  console.log(msg);
  res.status(200).json(`Success: ${msg}`);
});

//
/** ======================================================
 *  ROUTES- POST, /tmp/register/, with register()
 *  ====================================================== */
router.post("/tmp/register/", tmpController.register);

//
/** ======================================================
 *  ROUTES- POST, /tmp/login/, with login()
 *  ====================================================== */
router.post("/tmp/login/", tmpController.login);

module.exports = router;
