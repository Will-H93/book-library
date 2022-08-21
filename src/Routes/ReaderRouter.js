const { Router } = require("express");
const readerController = require("../controllers/readerController");

const readerRouter = new Router();

readerRouter.post("/", readerController.create);
readerRouter.get("/", readerController.read);
readerRouter.get("/:id", readerController.readId);
readerRouter.patch("/:id", readerController.update);
readerRouter.delete("/:id", readerController.delete);
module.exports = readerRouter;
