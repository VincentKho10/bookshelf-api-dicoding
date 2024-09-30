
const books = require("../books");

const updateBookHandler = (req, h) => {
    class HttpError extends Error {
      constructor(code, message) {
        super(message);
        this.status = code;
      }
    }
  const {id} = req.params;
  const idx = books.findIndex((v) => v.id == id);
  const changes = req.payload;
  try {
    if (!changes.name) {
      throw new HttpError(400, "Gagal memperbarui buku. Mohon isi nama buku");
    }
    if (changes.readPage > changes.pageCount) {
      throw new HttpError(
        400,
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
      );
    }

    if (idx > -1) {
      books[idx] = {
        ...books[idx],
        ...changes,
        finished: changes.readPage == changes.pageCount,
        updatedAt: new Date().toISOString(),
      };

      const res = h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
      });
      res.type("application/json").code(200);
      return res;
    }
    throw new HttpError(404, "Gagal memperbarui buku. Id tidak ditemukan")
  } catch (err) {
    const res = h.response({
      status: "fail",
      message: err.message,
    });
    res.type("application/json").code(err.status);
    return res
  }
};

module.exports = updateBookHandler;
