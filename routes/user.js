const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/userCreate', userController.user_signup);
router.post('/email_otp',userController.send_otp_toEmail);
router.post('/login',userController.login);
// router.post('/forgotPassword',userController.forgotPassword);
//router.post('/changePassword',userController.changePassword);
router.put('/userUpdate',userController.userUpdate);
router.delete('/deleteUser',userController.deleteUser);

module.exports = router;