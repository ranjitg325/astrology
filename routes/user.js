const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require("../middleware/authenticateUser");

router.post('/userCreate', userController.userSignup);
//resend otp
router.post('/resendOtp', userController.resendOtp);
//verify otp
router.post('/verifyOtp', userController.verifyOtpAndGenerateToken);
//router.post('/email_otp',userController.send_otp_toPhone);
router.post('/login',userController.login);
router.post('/logout', middleware.authenticateToken, userController.logout);
router.post('/forgotPassword', userController.forgotPassword); 
router.post('/updatePassword', userController.updatePassword); //after otp verification(forgot password) user can change their password

router.put('/userUpdate',middleware.authenticateToken, userController.userUpdate);
router.delete('/deleteUser',middleware.authenticateToken, userController.deleteUser);

// user can see their profile
router.get('/getProfile',middleware.authenticateToken, userController.getOwnProfile);

// user can see their prediction by choosing card
router.get('/getPredictionByCardToday',middleware.authenticateToken, userController.getPredictionByCardTypeAndPredictionTypeToday);
router.get('/getPredictionByCardTomorrow',middleware.authenticateToken, userController.getPredictionByCardTypeAndPredictionTypeTomorrow);
router.get('/getPredictionByCardWeekly',middleware.authenticateToken, userController.getPredictionByCardTypeAndPredictionTypeWeekly);
router.get('/getPredictionByCardMonthly',middleware.authenticateToken, userController.getPredictionByCardTypeAndPredictionTypeMonthly);
router.get('/getPredictionByCardYearly',middleware.authenticateToken, userController.getPredictionByCardTypeAndPredictionTypeYearly);

//user can check their horoscope
router.get('/getHoroscopeByTypeToday',middleware.authenticateToken, userController.getHoroscopeByTypeToday);  
router.get('/getHoroscopeByTypeTomorrow',middleware.authenticateToken, userController.getHoroscopeByTypeTomorrow); 
router.get('/getHoroscopeByTypeWeekly',middleware.authenticateToken, userController.getHoroscopeByTypeWeekly); 
router.get('/getHoroscopeByTypeMonthly',middleware.authenticateToken, userController.getHoroscopeByTypeMonthly); 
router.get('/getHoroscopeByTypeYearly',middleware.authenticateToken, userController.getHoroscopeByTypeYearly); 

//cancel sheduled chat with the astrologer
router.put('/cancelSheduledChat',middleware.authenticateToken, userController.cancelMeeting);

//user can see their sheduled chat
router.get('/getMeetingList',middleware.authenticateToken, userController.getMeetingList);

//user will get the list of astrologers
router.get('/getAstrologerList',middleware.authenticateToken, userController.getAstrologerList);

//user will give rating to the jyotish after the chat
router.post('/giveRating',middleware.authenticateToken, userController.giveRating);
router.put('/updateRating',middleware.authenticateToken, userController.updateRating);
router.get('/getRating',middleware.authenticateToken, userController.getRating);

module.exports = router;