const { Router } = require("express");
const bookController = require("../controllers/bookController");

const bookRouter = new Router();

bookRouter.post("/", bookController.create);
bookRouter.get("/", bookController.read);
bookRouter.get("/:id", bookController.readId);
bookRouter.patch("/id", bookController.updateBook);

module.exports = bookRouter;
