const { User, Favorites } = require("../models/index");
const express = require("express");
const user = require("./user");
const favorites = require("./favorites");

const router = express.Router();

router.use("/user", user);
router.use("/favorites", favorites);

module.exports = router;