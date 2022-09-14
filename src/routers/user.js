const express = require("express");
const router = express.Router();
const { user, create } = require("../controllers/user");

router.get("/:id", user);

router.post("/", create);

module.exports = router;
