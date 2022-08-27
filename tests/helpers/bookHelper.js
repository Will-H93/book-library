const { Book } = require("../../src/models");

const postBook = async (res, data) => {
  try {
  const dbBook = await Book.create(data);
  return res.status(201).json(dbBook);
  } catch (err) {
  return res.status(404).json({ error: "Book not created" });
  }
};

const getBooks = async (res) => {
  const dbBook = await Book.findAll();
  if (!dbBook) {
    return res.status(404).json({ error: "Book not found" });
  }
  return res.status(200).json(dbBook);
};

const getBookById = async (res, id) => {
  const bookId = id
  const dbBook = await Book.findByPk(bookId);

  if (!dbBook) {
    return res.status(404).json({ error: "The book could not be found." });
  }
  return res.status(200).json(dbBook);
};

const updateBook = async (res, body, id) => {
  const bookId = id;
  const updateData = body;

  const [updatedRows] = await Book.update(updateData, {
    where: { id: bookId },
  });
  if (!updatedRows) {
    return res
      .status(404)
      .json({ error: `Book ID (${bookId}) could not be found.` });
  }
  return res.status(200).json({ result: "Book Updated" });
};

const deleteById = async (res, id) => {
  const bookId = id;

  try {
    const deletedRows = await Book.destroy({ where: { id: bookId } });

    if (!deletedRows) {
      return res.status(404).json({ error: "The book could not be found." });
    }
    return res.status(204).json({ result: "Book Deleted" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { postBook, getBooks, getBookById, updateBook, deleteById };
