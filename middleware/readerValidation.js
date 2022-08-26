const Joi = require("joi");

const createReaderSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const updateReaderSchema = Joi.object({
  name: Joi.string().when({
    is: Joi.exist(),
    then: Joi.string().min(1),
  }),
  email: Joi.string().when({
    is: Joi.exist(),
    then: Joi.string().email(),
  }),
  password: Joi.string().when({
    is: Joi.exist(),
    then: Joi.string().min(8),
  }),
});

const validateCreateBody = async (req, res, next) => {
  const { error } = createReaderSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};

const validateUpdateBody = async (req, res, next) => {
  const { error } = updateReaderSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};

module.exports = { validateCreateBody, validateUpdateBody };
