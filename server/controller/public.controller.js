const publicService = require("../services/public.service");
const ObjectId = require("mongodb").ObjectID;

/**
 * Method: GET /public/newreleases
 * return all the newly released books
 */

class PublicController {
  async allbooks(req, res) {
    const { status, data, message } = await publicService.allbooks();
    res.status(status);
    res.json({ message, data });
  }
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

  async bookdetail(req, res) {
    const bookId = req.params.bookid;
    if (!ObjectId.isValid(bookId)) {
      res.status(400);
      return res.send(
        `Controller (book detail) - Invalid book id, typeof objectId expected.`
      );
    }
    const { status, data, message } = await publicService.bookdetail(bookId);
    res.status(status);
    res.json({ message, data });
  }
}

module.exports = PublicController;
