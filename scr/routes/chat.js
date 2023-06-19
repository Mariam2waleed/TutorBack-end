const express = require("express");
const router = express.Router();
const controller = require("../logic/ChattingController");
router.post("/message/send", controller.SendMessage);
router.delete("/:userId", controller.getChatRoomOfUser);
router.get("/messages/:chatId", controller.getChatMessages);
module.exports = router;