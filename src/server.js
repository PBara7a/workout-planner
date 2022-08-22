const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.disable("x-powered-by");
const port = 3030;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const exerciseRouter = require("./routers/exercise");
const bodyRouter = require("./routers/body");

app.use("/exercise", exerciseRouter);
app.use("/body", bodyRouter);

module.exports = app;
