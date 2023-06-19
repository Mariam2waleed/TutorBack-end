const mongoose = require("mongoose");

const { Schema } = mongoose;

const ChatMessageSchema = new Schema(
  {
    room_id: {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
    },
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);