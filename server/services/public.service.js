const Books = require("../model/Book");

module.exports = {
  /**
   * return all newly released books
   *
   *
   */
  newreleases: async () => {
    const result = {
      status: null,
      message: null,
      data: null,
    };
    console.log("List of newly released books.");

    if (!Books) {
      result.status = 404;
      result.message = "The database has not been setup.";
      return result;
    }
    // fetch all newly released book from database
    const newReleased = await Books.find({ category: "new released" }).sort({
      title: 1,
    });

    // error handling
    if (!newReleased) {
      result.status = 404;
      result.message = "There is no new book released.";
      return result;
    }

    result.status = 200;
    result.message = "List of new books released.";
    result.data = newReleased;

    console.log(newReleased);

    return result;
  },

  /**
   * return all top rated books
   *
   *
   */
  toprated: async () => {
    const result = {
      status: null,
      message: null,
      data: null,
    };
    console.log("List of newly released books.");

    if (!Books) {
      result.status = 404;
      result.message = "The database has not been setup.";
      return result;
    }
    // fetch all newly released book from database
    const topRated = await Books.find({ category: "top rated" }).sort({
      title: 1,
    });

    // error handling
    if (!topRated) {
      result.status = 404;
      result.message = "There is no book on top rate.";
      return result;
    }

    result.status = 200;
    result.message = "List of top rated books.";
    result.data = topRated;

    console.log(topRated);

    return result;
  },
};
