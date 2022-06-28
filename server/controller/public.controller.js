const publicService = require("../services/public.service");

/**
 * Method: GET /public/newreleases
 * return all the newly released books
 */

class PublicController {
  async newreleases(req, res) {
    const { status, data, message } = await publicService.newreleases();
    res.status(status);
    res.json({ message, data });
  }

  async toprated(req, res) {
    const { status, data, message } = await publicService.toprated();
    res.status(status);
    res.json({ message, data });
  }
}

module.exports = PublicController;
