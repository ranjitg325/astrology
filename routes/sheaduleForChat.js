const express = require('express');
const router = express.Router();
const sheduleForChatController = require('../controllers/sheduleForChatController');
const middleware = require("../middleware/authenticateUser");

router.post('/sheduleAChat', middleware.authenticateToken,sheduleForChatController.sheduleChat);
router.put('/acceptMeeting', middleware.authenticateToken,sheduleForChatController.acceptMeeting);
// router.get('/getAllSheduleChat', middleware.authenticateToken,sheduleForChatController.getAllSheduleChat);
// router.get('/getSheduleChatById', middleware.authenticateToken,sheduleForChatController.getSheduleChatById);
// router.put('/updateSheduleChat', middleware.authenticateToken,sheduleForChatController.updateSheduleChat);
// router.delete('/deleteSheduleChat', middleware.authenticateToken,sheduleForChatController.deleteSheduleChat);

module.exports = router;