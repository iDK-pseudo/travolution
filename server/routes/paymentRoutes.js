const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentControllers");
const { check } = require("express-validator");

router.post(
  "/",
  check("userId").trim().escape(),
  check("groupId").trim().escape(),
  check("amount").trim().escape(),
  paymentController.newPayment
);

module.exports = router;
