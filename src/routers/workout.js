const express = require("express");
const router = express.Router();
const { newWorkout, workouts } = require("../controllers/workout");

router.get("/", workouts);

router.post("/", newWorkout);

module.exports = router;
