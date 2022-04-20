const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const { check } = require("express-validator");

router.post(
  "/signup",
  check("emailId").isEmail().normalizeEmail().trim().escape(),
  check("password").isStrongPassword().trim().escape(),
  userController.signup
);

router.post(
  "/signin",
  check("emailId").isEmail().normalizeEmail().trim().escape(),
  check("password").isStrongPassword().trim().escape(),
  userController.signin
);

router.post(
  "/group",
  check("userId").trim().escape(),
  check("groupName").trim().escape(),
  userController.createGroup
);

module.exports = router;
