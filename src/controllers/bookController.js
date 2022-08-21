const { Book } = require("../models");

exports.create = async (req, res) => {
  const dbBook = await Book.create(req.body);
  if (!dbBook) {
    return res.status(404).json({ error: "Book not created" });
  }
  return res.status(201).json(dbBook);
};

exports.read = async (req, res) => {
  const dbBook = await Book.findAll();
  if (!dbBook) {
    return res.status(404).json({ error: "Book not found" });
  }
  return res.status(200).json(dbBook);
};

exports.readId = async (req, res) => {
  const bookId = req.params.id;
  const dbBook = await Book.findByPk(bookId);

  if (!dbBook) {
    return res.status(404).json({ error: "The book could not be found." });
  }
  return res.status(200).json(dbBook);
};

exports.updateBook = async (req, res) => {
  const bookId = req.params.id;
  const updateData = req.body;

  const [updatedRows] = await Book.update(updateData, {
    where: { id: bookId },
  });

  if (!updatedRows) {
    return res
      .status(404).json({ error: `Book ID (${bookId}) could not be found.` });
  }
  return res.status(200).json({ result: "Book Updated" });
};

exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;

  const deletedRows = await Book.destroy({ where: { id: bookId } });

  if (!deletedRows) {
    return res.status(404).json({ error: "The book could not be found." });
  }
  return res.status(204).json({ result: "Book Deleted" });
};
