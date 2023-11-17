const { Server } = require("socket.io");
const Chat = require("../modal/message.modal");
const AIController = require("../controller/ai.controller");
module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origins: ["http://localhost:8000"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket is connected");
    socket.emit("assistant reply", {message : ["Hi! How can I assist you today ?"], timestamp : new Date()});
    socket.on("connection", (msg) => {
      console.log(msg);
      return;
    });
    socket.on("chat message", async (msg) => {
      try {
        const { message } = msg;

        const userMessage = await Chat.create({ message });
        if (!userMessage) io.emit("error", "An error occurred");

        const aiResponse = await AIController.getAnswers(message);
        if (!aiResponse.length) {
          io.emit("error", "An error occurred");
          return true;
        }
        const saveResponse = await Chat.create({
          role: "assistant",
          message: aiResponse,
        });
        if (!saveResponse) io.emit("error", "An error occurred");
        socket.emit("assistant reply", saveResponse);
      } catch (e) {
        io.emit("error", "An error occurred");
      }
    });

    socket.on("get message", async (data) => {
      const limit = 5;
      const skip = (data - 1) * limit;
      let chatData = await Chat.find({})
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit);
      const hasMore = chatData.length === limit;
      io.emit("load message", { messages: chatData, hasMore });
    });
  });
};
