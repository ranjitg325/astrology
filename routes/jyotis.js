const express = require('express');
const router = express.Router();

const jyotisController = require("../controllers/jyotisController");
const middleware = require("../middleware/authenticateUser");

router.post('/signup', jyotisController.createJyotis);
router.post('/phone_otp',jyotisController.send_otp_phone);
router.post('/login',jyotisController.login);
router.post('/logout',middleware.authenticateToken, jyotisController.logout);
router.post('/forgotPassword', jyotisController.forgotPassword); 
router.post('/updatePassword', jyotisController.updatePassword); //after otp verification(forgot password) user can change their password

router.put('/updateJyotis',middleware.authenticateToken, jyotisController.updateJyotis);
router.delete('/deleteJyotis',middleware.authenticateToken, jyotisController.deleteJyotis);
router.get('/getProfile',middleware.authenticateToken, jyotisController.getOwnProfile);

//update the availability of the astrologer
router.put('/updateAvailability',middleware.authenticateToken, jyotisController.updateAvailability);

module.exports=router;