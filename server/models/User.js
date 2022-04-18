const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: String,
  emailId: String,
  hashedPassword: String,
});

const model = mongoose.model("User", UserSchema);

module.exports = model;
