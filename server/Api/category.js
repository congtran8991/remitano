const express = require("express");
const categoryControllers = require("../Controllers/category");

const router = express.Router()

router.route("/").post(categoryControllers.createNewCategory)
router.route("/").get(categoryControllers.getAllCategory)

module.exports = router
