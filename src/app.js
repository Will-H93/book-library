const express = require("express");
const readerRouter = require("./Routes/readerRouter");
const bookRouter = require("./Routes/bookRouter");
const genreRouter = require("./Routes/genreRouter");

const app = express();

app.use(express.json());

app.use("/readers", readerRouter);

app.use("/books", bookRouter);

app.use("/genres", genreRouter);

module.exports = app;
