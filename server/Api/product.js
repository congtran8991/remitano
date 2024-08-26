const express = require("express");
const productControllers = require("../Controllers/product");
const { authenticateJWT } = require("../Utils");
const router = express.Router();

router.route("/").post(productControllers.createNewProduct);
router.route("/").get(productControllers.getAllProduct);

module.exports = router
