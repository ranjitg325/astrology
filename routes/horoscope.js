const express = require('express');
const router = express.Router();
const horoscopeController = require('../controllers/horoscopeController');
const middleware = require("../middleware/authenticateUser");

router.post('/createHoroscope',/*middleware.authenticateToken,*/horoscopeController.horoscopeCreate);
router.get('/getAllHoroscopes',/*middleware.authenticateToken,*/horoscopeController.getAllHoroscopes);
router.get('/getHoroscopeById',horoscopeController.getHoroscopeById);
router.put('/updateHoroscope',/*middleware.authenticateToken,*/horoscopeController.updateHoroscope);
router.delete('/deleteHoroscope',/*middleware.authenticateToken,*/horoscopeController.deleteHoroscope);



module.exports = router;