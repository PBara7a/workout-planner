const express = require("express");
const router = express.Router();
const { create, workouts, userWorkouts } = require("../controllers/workout");

router.get("/", workouts);

router.post("/", create);

module.exports = router;
