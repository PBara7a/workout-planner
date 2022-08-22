const express = require("express");
const router = express.Router();
const { bodyparts, targetMuscles } = require("../controllers/body");

router.get("/parts", bodyparts);
router.get("/targets", targetMuscles);

module.exports = router;
