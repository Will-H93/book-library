const { Router } = require("express");
const genreController = require("../controllers/genreController");

const genreRouter = new Router();

const {
  validateCreateBody,
  validateUpdateBody,
} = require("../../middleware/genreValidation");

genreRouter.post("/", validateCreateBody, genreController.create);
genreRouter.get("/", genreController.read);
genreRouter.get("/:id", genreController.readId);
genreRouter.patch("/:id", validateUpdateBody, genreController.update);
genreRouter.delete("/:id", genreController.delete);

module.exports = genreRouter;
