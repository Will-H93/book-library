const {
  postItem,
  getItems,
  getItemById,
  updateItem,
  deleteItemById,
} = require("../../tests/helpers/helper");

// req.baseUrl equals /authors, /books, /genres or /authors based on the route app uses
// cut each end off with slice to return the model for each export

exports.create = async (req, res) =>
  postItem(res, req.baseUrl.slice(1, -1), req.body);

exports.read = async (req, res) => getItems(res, req.baseUrl.slice(1, -1));

exports.readId = async (req, res) =>
  getItemById(res, req.baseUrl.slice(1, -1), req.params.id);

exports.update = async (req, res) =>
  updateItem(res, req.baseUrl.slice(1, -1), req.body, req.params.id);

exports.delete = async (req, res) =>
  deleteItemById(res, req.baseUrl.slice(1, -1), req.params.id);
