const booksRouter = require("express").Router();

const {
  getAllBooks,
  getBookByType,
  createABook,
  updateABook,
  getBookByAuthor,
} = require("./controller");

booksRouter.get("/", getAllBooks);

booksRouter.get("/type/:type", getBookByType);

booksRouter.get("/author/:author", getBookByAuthor);

booksRouter.post("/", createABook);

booksRouter.patch("/:id", updateABook);
module.exports = booksRouter;
