const { chkmember, chkcollection } = require("../services/admin.service");
const adminService = require("../services/admin.service");

class AdminController {
  // This is a class, which has methods:
  // 'addmembers()' - inserts demodata of members
  // 'deletemembers()' - deletes demodata of members
  // 'updatereservations()' - flips reservation status of book - update "in queue" TO "ready for pickup", update furthest pickup date possible

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

  //
  /** ======================================================
   *  Controller - PUT, updatereservation()
   *  ====================================================== */
  async updatereservations(req, res) {
    const { status, data, message } = await adminService.updatereservations();
    res.status(status);
    res.json({ message, data });
  }
}

module.exports = AdminController;
