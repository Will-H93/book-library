const express = require("express");
const readerRouter = require("./Routes/readerRouter");
const bookRouter = require("./Routes/bookRouter");

const app = express();

app.use(express.json());

app.use("/readers", readerRouter);

app.use("/books", bookRouter);

module.exports = app;
