const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workout");

router.get("/", workoutController.getWorkouts);

router.post("/", workoutController.createWorkout);

router.delete("/:id", workoutController.deleteWorkout);

module.exports = router;
