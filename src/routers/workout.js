const express = require("express");
const router = express.Router();
const { create, workouts } = require("../controllers/workout");

router.get("/", workouts);

router.post("/", create);

module.exports = router;
