const express = require('express');
const router = express.Router();
const chatLiveController = require('../controllers/chatLive');


router.get('/chat/:person', chatLiveController.chat);


module.exports = router;