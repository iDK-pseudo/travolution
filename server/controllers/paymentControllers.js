const User = require("../models/User");
const Group = require("../models/Group");
const Payment = require("../models/Payment");
const { validationResult } = require("express-validator");

exports.newPayment = async (req, res) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    const { userId, groupId, amount } = req.body;

    try {
      const user = await User.findById(userId);
      const group = await Group.findById(groupId);

      if (user && group) {
        const payment = Payment.create({
          groupId: group,
          paidByUserId: user,
          amount: amount,
        });

        res.send({
          status: 202,
          message: "Payment created..",
          groupId: payment._id,
        });
      } else {
        res.send({ status: 500, message: "Invalid User or Group" });
      }
    } catch (error) {
      res.send({ status: 500, message: error.message });
      console.log(error);
    }
  } else {
    res.send({ status: 500, message: validationErrors });
  }
};
