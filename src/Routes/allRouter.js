const { Router } = require("express");
const allController = require("../controllers/controller");

const allRouter = new Router();

const {
  validateCreateBody,
  validateUpdateBody,
} = require("../../middleware/validation");

allRouter.post("/", validateCreateBody, allController.create);
allRouter.get("/", allController.read);
allRouter.get("/:id", allController.readId);
allRouter.patch("/:id", validateUpdateBody, allController.update);
allRouter.delete("/:id", allController.delete);

module.exports = allRouter;
