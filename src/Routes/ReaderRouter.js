const { Router } = require("express");
const readerController = require("../controllers/ReaderConroller");

const readerRouter = new Router();

readerRouter.post("/", readerController.create);

module.exports = readerRouter;
