const express = require("express");
const router = express.Router();
const { create, workouts, userWorkouts } = require("../controllers/workout");

router.get("/", workouts);
router.get("/:userId", userWorkouts);

router.post("/", create);

module.exports = router;
