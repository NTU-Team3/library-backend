const adminService = require("../services/admin.service");

class AdminController {
  // This is a class, which has methods:
  // 'addmembers()' - inserts demo data of members
  // 'deletemembers()' - deletes demo data of members
  // 'resetmembers(delm, addm)' - resets demo data of members with callback functions
  // 'updatereservations()' - flips reservation status of book - update "in queue" TO "ready for pickup", update furthest pickup date possible

  //
  /** ======================================================
   *  CONTROLLER - GET "POST", addmembers()
   *  ====================================================== */
  async addmembers(req, res) {
    const { status, data, message } = await adminService.addmembers();
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - GET "DELETE", deletemembers()
   *  ====================================================== */
  async deletemembers(req, res) {
    const { status, data, message } = await adminService.deletemembers();
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - GET "DELETE" & GET "POST", resetmembers()
   *  ====================================================== */
  async resetmembers(req, res) {
    const delm = await adminService.deletemembers();
    const addm = await adminService.addmembers();

    const { status, data, message } = await adminService.resetmembers(delm, addm);
    res.status(status);
    res.json({ message, data });
  }

  //
  /** ======================================================
   *  CONTROLLER - DELETE, updatereservation()
   *  ====================================================== */
  // async updatereservations(req, res) {
  //   const { status, data, message } = await adminService.updatereservations();
  //   res.status(status);
  //   res.json({ message, data });
  // }
}

module.exports = AdminController;
