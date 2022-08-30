const express = require("express");
const router = express.Router();
const { send } = require("../controllers/email");

router.post("/", send);

module.exports = router;
