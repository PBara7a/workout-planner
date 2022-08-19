const express = require("express");
const router = express.Router();
const { getExercises } = require("../controllers/exercise");

router.get("/", getExercises);

module.exports = router;
