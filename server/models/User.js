const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  emailId: { type: String, required: true },
  hashedPassword: { type: String, required: true },
});

UserSchema.static('findOneByEmailId', function(email) { return this.find({ emailId: email }); });

const model = mongoose.model("User", UserSchema);

module.exports = model;
