const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversation: { type: mongoose.Types.ObjectId, ref: "conversation" },
    sender: { type: mongoose.Types.ObjectId, ref: "user || admin " },
    recipient: [{ type: mongoose.Types.ObjectId, ref: "user || admin" }],
    text: String,
    // media: Array,
    // call: Object
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("message", messageSchema);
