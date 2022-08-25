const { Router } = require("express");
const Joi = require("joi")

const readerController = require("../controllers/readerController");

const createReaderSchema = Joi.object({
    name: Joi.string().min(1), 
    email: Joi.string().email(), 
    password: Joi.string().min(8)
})

const readerRouter = new Router();
const validateCreateBody = async (req, res, next) => {
    const { error } = createReaderSchema.validate(req.body)
    if(error) {
        return res.status(400).json(error)
    } next()
}
readerRouter.post("/", validateCreateBody, readerController.create);
readerRouter.get("/", readerController.read);
readerRouter.get("/:id", readerController.readId);
readerRouter.patch("/:id", readerController.update);
readerRouter.delete("/:id", readerController.delete);

module.exports = readerRouter;
