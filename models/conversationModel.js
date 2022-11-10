const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    recipients: [{ type: mongoose.Types.ObjectId, ref: "admin" }],
    text: String,
    media: Array,
    call: Object,
    // groupName: {
    //   type: String,
    //   required: true,
    // },
    // isGroup: {
    //   type: Boolean,
    //   default: false,
    // }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("conversation", conversationSchema);
