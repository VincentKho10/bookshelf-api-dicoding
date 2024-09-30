const books = require('../books')

const getOneBookHandler = (req, h) => {
  const { id } = req.params;
  const book = books.find((v) => v.id === id);

  if (book) {
    const res = h.response({
      status: "success",
      data: {
        book: book,
      },
    });
    res.type("application/json").code(200);
    return res;
  }

  const res = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  res.type("application/json").code(404);
  return res;
};

module.exports = getOneBookHandler;
