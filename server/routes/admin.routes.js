const express = require("express");
const router = express.Router();

// Import the controller files
const AdminController = require("../controller/admin.controller");
// Instantiate the class
const adminController = new AdminController();

//
/** ======================================================
 *  Endpoint Routes - GET, /admin, homepage for admin only
 *  ====================================================== */

router.get("/admin", (req, res) => {
  const msg = "Welcome to our Library (admin)";

  console.log(msg);
  res.status(200).json(`Success: ${msg}`);
});

//
/** ======================================================
 *  Endpoint Routes - GET "POST", /admin/a-members, with addmembers()
 *  ====================================================== */
router.get("/admin/a-members/", adminController.addmembers);

/** ======================================================
 *  Endpoint Routes - GET "DELETE", /admin/d-members, with deletemembers()
 *  ====================================================== */
router.get("/admin/d-members/", adminController.deletemembers);

module.exports = router;
