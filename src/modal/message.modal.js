const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatMessage = new Schema({
      role: {
        type: String,
        default: "user",
      },
      message: {
        type: Array,
        required: true,
      },
      timestamp: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model('ChatMessage', chatMessage);

module.exports = ChatMessage;