const Books = require("../model/Book");
const ObjectId = require("mongodb").ObjectID;

module.exports = {
  /**
   *
   * return all books, sorted by category and title
   */

  allbooks: async () => {
    const result = {
      status: null,
      message: null,
      data: null,
    };
    console.log("List of books.");

    if (!Books) {
      result.status = 404;
      result.message = "The database has not been setup.";
      return result;
    }
    // fetch all newly released book from database
    const allbooks = await Books.find(
      {},
      {
        id: 1,
        title: 1,
        thumbnail: 1,
        category: 1,
        author: 1,
        rating: 1,
        globalrating: 1,
        desc: 1,
      }
    ).sort({
      category: -1,
      title: 1,
    });

    // error handling
    if (!allbooks) {
      result.status = 404;
      result.message = "There is no book in the library.";
      return result;
    }

    result.status = 200;
    result.message = "List of books available.";
    result.data = allbooks;

    console.log(allbooks);

    return result;
  },

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
    const newReleased = await Books.find(
      { category: "new released" },
      {
        id: 1,
        title: 1,
        thumbnail: 1,
        category: 1,
        author: 1,
        rating: 1,
        globalrating: 1,
        desc: 1,
      }
    ).sort({
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
    const topRated = await Books.find(
      { category: "top rated" },
      {
        id: 1,
        title: 1,
        thumbnail: 1,
        category: 1,
        author: 1,
        rating: 1,
        globalrating: 1,
        desc: 1,
      }
    ).sort({
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

  bookdetail: async (bookId) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };
    console.log(`Synosis and reviews of book ${bookId}.`);

    if (!Books) {
      result.status = 404;
      result.message = "The database has not been setup.";
      return result;
    }
    // fetch all newly released book from database

    const lrecords = await Books.aggregate([
      { $match: { _id: ObjectId(bookId) } },
      // { $match: { "loans.status": "returned" } },
      {
        $project: {
          title: 1,
          author: 1,
          rating: 1,
          desc: 1,
          reviews: 1,
          thumbnail: 1,
          globalrating: 1,
          /* "reviews.owner": 1,
          "reviews.rating": 1,
          "reviews.date": 1,
          "reviews.comment": 1,*/
        },
      },
      {
        $sort: {
          "reviews.date": -1,
        },
      },
    ]);

    console.log(lrecords);

    // error handling
    if (!lrecords) {
      result.status = 404;
      result.message = `Book ${bookId} does not exist.`;
      return result;
    }

    result.status = 200;
    result.message = "Book Synosis and reviews.";
    result.data = lrecords;

    console.log(lrecords);

    return result;
  },
};
