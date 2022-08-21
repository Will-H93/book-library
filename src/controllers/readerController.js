const { Reader } = require("../models");

exports.create = async (req, res) => {
  const dbReader = await Reader.create(req.body);
  if (!dbReader) {
    return res.status(404).json({ error: "Reader not created" });
  }
  return res.status(201).json(dbReader);
};

exports.read = async (req, res) => {
  const dbReader = await Reader.findAll();
  if (!dbReader) {
    return res.status(404).json({ error: "Reader not found" });
  }
  return res.status(200).json(dbReader);
};

exports.readId = async (req, res) => {
  const readerId = req.params.id;
  const dbReader = await Reader.findByPk(readerId);

  if (!dbReader) {
    return res.status(404).json({ error: "The reader could not be found." });
  }
  return res.status(200).json(dbReader);
};

exports.update = async (req, res) => {
  const readerId = req.params.id;
  const updateData = req.body;

  const [updatedRows] = await Reader.update(updateData, {
    where: { id: readerId },
  });

  if (!updatedRows) {
    return res.status(404).json({ error: "The reader could not be found." });
  }
  return res.status(200).json({ result: "Reader Updated" });
};

exports.delete = async (req, res) => {
  const readerId = req.params.id;

  const deletedRows = await Reader.destroy({ where: { id: readerId } });

  if (!deletedRows) {
    return res.status(404).json({ error: "The reader could not be found." });
  }
  return res.status(204).json({ result: "Reader Deleted" });
};
