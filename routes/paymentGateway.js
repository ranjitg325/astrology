const express = require('express');
const router = express.Router();
const paymentGatewayController = require('../controllers/paymentGateway');


router.get('/pay', paymentGatewayController.payment);
router.post('/paynow', paymentGatewayController.paynow);
router.post('/callback', paymentGatewayController.callback);


module.exports = router;