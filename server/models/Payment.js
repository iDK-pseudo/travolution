const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  paidByUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Schema.Types.Decimal128, required: true },
});

const model = mongoose.model("Payment", PaymentSchema);

module.exports = model;
