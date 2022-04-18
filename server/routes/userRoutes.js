const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.post("/signup", userController.signup);

module.exports = router;
