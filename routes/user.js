const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require("../middleware/authenticateUser");

router.post('/userCreate', userController.user_signup);
router.post('/email_otp',userController.send_otp_toEmail);
router.post('/login',userController.login);
router.get('/logout', userController.logout);
router.post('/forgotPassword', userController.forgotPassword); //not tested
router.post('/updatePassword', userController.updatePassword); //not tested //after otp verification(forgot password) user can change their password

router.put('/userUpdate',middleware.authenticateToken, userController.userUpdate);
router.delete('/deleteUser',middleware.authenticateToken, userController.deleteUser);

// user can see their profile
router.get('/getProfile',middleware.authenticateToken, userController.getOwnProfile);
//user will see his future prediction from cardModel by choosing cardType and predictionType
router.get('/getPrediction',middleware.authenticateToken, userController.getPredictionByCardTypeAndPredictionType);
//user will see his past prediction from cardModel by choosing cardType and predictionType
//router.get('/getPastPrediction',middleware.authenticateToken, userController.getPastPrediction);


module.exports = router;