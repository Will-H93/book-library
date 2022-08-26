const Joi = require("joi");

const createBookSchema = Joi.object({
  title: Joi.string().min(2).required(),
  author: Joi.string().min(2).required(),
  genre: Joi.string(),
  isbn: Joi.string(),
});

const updateBookSchema = Joi.object({
  title: Joi.string().when({
    is: Joi.exist(),
    then: Joi.string().min(2),
  }),
  author: Joi.string().when({
    is: Joi.exist(),
    then: Joi.string().min(2),
  }),
  genre: Joi.string().when({
    is: Joi.exist(),
    then: Joi.string(),
  }),
  isbn: Joi.string().when({
    is: Joi.exist(),
    then: Joi.string(),
  }),
});

const validateCreateBody = async (req, res, next) => {
  const { error } = createBookSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};

const validateUpdateBody = async (req, res, next) => {
  const { error } = updateBookSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};

module.exports = { validateCreateBody, validateUpdateBody };
