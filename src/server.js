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

const dataRouter = require("./routers/data");
const exerciseRouter = require("./routers/exercise");
const bodyRouter = require("./routers/body");
const equipmentRouter = require("./routers/equipment");
const workoutRouter = require("./routers/workout");
const emailRouter = require("./routers/email");

app.use("/data", dataRouter);
app.use("/exercise", exerciseRouter);
app.use("/body", bodyRouter);
app.use("/equipment", equipmentRouter);
app.use("/workout", workoutRouter);
app.use("/email", emailRouter);

module.exports = app;
