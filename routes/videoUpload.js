const express = require('express');
const router = express.Router();
const videoUploadController = require('../controllers/videoUpload');
const middleware = require("../middleware/authenticateUser");


router.post('/uploadVideo',middleware.authenticateToken, videoUploadController.createVideo);
router.put('/updateVideo/:id',middleware.authenticateToken, videoUploadController.updateVideo); 
router.get('/getAllVideos',middleware.authenticateToken, videoUploadController.getAllVideos);
router.get('/getallvideoOfOwn',middleware.authenticateToken, videoUploadController.getallvideoOfOwn);
router.delete('/deleteVideo/:id',middleware.authenticateToken, videoUploadController.deleteVideo);
module.exports = router;