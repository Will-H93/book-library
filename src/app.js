const express = require("express");
const allRouter = require("./Routes/allRouter");

const app = express();

app.use(express.json());

app.use("/readers", allRouter);

app.use("/books", allRouter);

app.use("/genres", allRouter);

app.use("/authors", allRouter);

module.exports = app;
