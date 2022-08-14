const { Reader } = require("../models");

exports.create = async (req, res) => {
  const dbReader = await Reader.create(req.body);
  if (!dbReader) {
    return res.status(500).json({ error: "Reader not created" });
  }
  return res.status(201).json(dbReader);
};
