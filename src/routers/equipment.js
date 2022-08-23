const express = require("express");
const router = express.Router();
const { equipments } = require("../controllers/equipment");

router.get("/", equipments);

module.exports = router;
