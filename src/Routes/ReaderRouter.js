const { Router } = require("express");
const readerController = require("../controllers/ReaderConroller");

const readerRouter = new Router();

readerRouter.post("/", readerController.create);
readerRouter.get("/", readerController.read);
readerRouter.get("/:id", readerController.readId);
readerRouter.patch("/:id", readerController.update);
readerRouter.delete("/:id", readerController.delete);
module.exports = readerRouter;
