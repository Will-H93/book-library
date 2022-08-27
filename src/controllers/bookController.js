const {
  postBook, getBooks,getBookById, updateBook, deleteById
} = require("../../tests/helpers/bookHelper");

exports.create = async (req, res) => postBook(res, req.body);

exports.read = async (req, res) => getBooks(res)

exports.readId = async (req, res) => getBookById(res, req.params.id)

exports.updateBook = async (req, res) => updateBook(res, req.body, req.params.id);

exports.deleteBook = async (req, res) => deleteById(res, req.params.id)
