const dbClient = require("../../../utils/dbClient");

function getAllBooks(reg, res) {
  dbClient.book.findMany().then((books) => res.json({ books }));
}

async function createABook(req, res) {
  const newBook = req.body;

  try {
    const book = await dbClient.book.create({
      data: {
        ...newBook,
      },
    });
    res.json({ created: newBook });
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function updateABook(req, res) {
  const bookId = Number(req.params.id);
  const newData = req.body;

  try {
    const exictingBook = await dbClient.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (exictingBook) {
      const updatedBook = await dbClient.book.update({
        where: {
          id: bookId,
        },
        data: {
          ...exictingBook,
          ...newData,
        },
      });
      res.json({ updated: updatedBook });
    } else {
      res.json({ msg: `Book with id ${bookId} doesn't exict` });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function getBookByAuthor(req, res) {
  const author = req.params.author;

  try {
    const books = await dbClient.book.findMany({
      where: {
        author: author,
      },
      orderBy: {
        publicationDate: "desc",
      },
    });
    res.json({ filtered: books });
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function getBookByType(req, res) {
  const type = req.params.type;
  const topic = req.query.topic;

  try {
    if (topic) {
      const books = await dbClient.book.findMany({
        where: {
          type: type,
          topic: topic,
        },
      });
      res.json({ filtered_by_topic: books });
    } else {
      const books = await dbClient.book.findMany({
        where: {
          type: type,
        },
      });
      res.json({ filtered_by_type: books });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = {
  getAllBooks,
  getBookByType,
  createABook,
  updateABook,
  getBookByAuthor,
};
