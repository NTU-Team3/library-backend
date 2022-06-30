const { chkmember, chkcollection } = require("../services/admin.service");
const adminService = require("../services/admin.service");

class AdminController {
  // This is a class, which has methods 'addmembers()', 'deletemembers()'

  //
  /** ======================================================
   *  Controller - POST, addmembers()
   *  ====================================================== */
  async addmembers(req, res) {
    const { status, data, message } = await adminService.addmembers();
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  Controller - DELETE, deletemembers()
   *  ====================================================== */
  async deletemembers(req, res) {
    const { status, data, message } = await adminService.deletemembers();
    res.status(status);
    res.json({ message, data });
  }
}

module.exports = AdminController;
