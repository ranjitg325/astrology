const express = require('express');
const router = express.Router();

const messageController = require("../controllers/messageController")
const middleware = require("../middleware/authenticateUser");

router.post("/createMessage",middleware.authenticateToken,  messageController.createMessage);
router.get("/getConversations",middleware.authenticateToken,  messageController.getConversations);
router.get("/getMessage/:id", middleware.authenticateToken, messageController.getMessages);
//router.delete("/deleteMessage/:id",middleware.authenticateToken,  messageController.deleteMessages);


module.exports = router;