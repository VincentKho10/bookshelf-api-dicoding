const books = require("../books");

const getAllBookHandler = (req, h) => {
  if (books.length > 0) {
    const res = h.response({
      status: "success",
      data: {
        books: books,
      },
    });
    res.type("application/json");
    res.code(200);
    return res;
  }

  const res = h.response({
    status: "success",
    data: {
      books: [],
    },
  });
  res.type("application/json");
  res.code(200);
  return res;
};

module.exports = { getAllBookHandler };
