const Joi = require("joi");

const createAuthorSchema = Joi.object({
  author: Joi.string().min(2).required(),
});

const updateAuthorSchema = Joi.object({
  author: Joi.string().when({
    is: Joi.exist(),
    then: Joi.string().min(2),
  }),
});

const validateCreateBody = async (req, res, next) => {
  const { error } = createAuthorSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};

const validateUpdateBody = async (req, res, next) => {
  const { error } = updateAuthorSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};

module.exports = { validateCreateBody, validateUpdateBody };
