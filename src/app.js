const express = require("express");
const readerRouter = require("./Routes/ReaderRouter");

const app = express();

app.use(express.json());

app.use("/readers", readerRouter);

module.exports = app;
