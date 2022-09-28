const express = require("express");
const router = express.Router();
const { user, create, getUserWorkouts } = require("../controllers/user");

router.get("/:id", user);
router.get("/:id/workouts", getUserWorkouts);

router.post("/", create);

module.exports = router;
