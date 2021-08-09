const petsRouter = require("express").Router();

const { createAPet, deleteAPet, updateAPet } = require("./controller");

petsRouter.post("/", createAPet);

petsRouter.delete("/:id", deleteAPet);

petsRouter.patch("/:id", updateAPet);

module.exports = petsRouter;
