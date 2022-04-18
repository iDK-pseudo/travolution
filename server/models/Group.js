const mongoose = require("mongoose");
const { Schema } = mongoose;

const GroupSchema = {
  groupName: { type: String, required: true },
  userIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
};

module.exports = mongoose.model("Group", GroupSchema);
