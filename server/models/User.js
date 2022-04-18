const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  emailId: { type: String, required: true },
  hashedPassword: { type: String, required: true },
});

const model = mongoose.model("User", UserSchema);

module.exports = model;
