const {nanoid} = require('nanoid');
const books = require('../books');

const createBookHandler = (req, h) => {
  const book = req.payload;
  const { pageCount, readPage } = book;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  try {
    if (!book.name) {
      throw new Error("Gagal menambahkan buku. Mohon isi nama buku");
    }
    if (readPage > pageCount) {
      throw new Error(
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
      );
    }

    books.push({
      ...book,
      id,
      finished,
      insertedAt,
      updatedAt,
    });

    const isSuccess = books.find((v) => v.id == id);

    if (isSuccess) {
      const res = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      });
      
    res.type("application/json").code(201);
      return res;
    }
    throw new Error("Gagal Menambahkan Buku, Id tidak ditemukan");
  } catch (err) {
    const res = h.response({
      status: "fail",
      message: err.message,
    });
    
    res.type("application/json").code(400);
    return res;
  }
};

module.exports = createBookHandler;
