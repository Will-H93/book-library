const { Router } = require("express");
const bookController = require("../controllers/bookController");

const bookRouter = new Router();

const {
  validateCreateBody,
  validateUpdateBody,
} = require("../../middleware/bookValidation");

bookRouter.post("/", validateCreateBody, bookController.create);
bookRouter.get("/", bookController.read);
bookRouter.get("/:id", bookController.readId);
bookRouter.patch("/:id", validateUpdateBody, bookController.updateBook);
bookRouter.delete("/:id", bookController.deleteBook);

module.exports = bookRouter;
