const express = require('express');
const router = express.Router();
const videoUploadController = require('../controllers/videoUpload');

//router.post('/userCreate', userController.user_signup);
router.post('/upload', videoUploadController.upload);
router.get('/list', videoUploadController.list);
router.get('/download/:filename', videoUploadController.download);
router.delete('/delete/:filename', videoUploadController.delete);

module.exports = router;