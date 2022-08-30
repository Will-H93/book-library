const Joi = require("joi");

const createGenreSchema = Joi.object({
  genre: Joi.string().min(2).required(),
});

const updateGenreSchema = Joi.object({
  genre: Joi.string().when({
    is: Joi.exist(),
    then: Joi.string().min(2),
  }),
});

const validateCreateBody = async (req, res, next) => {
  const { error } = createGenreSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};

const validateUpdateBody = async (req, res, next) => {
  const { error } = updateGenreSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};

module.exports = { validateCreateBody, validateUpdateBody };
