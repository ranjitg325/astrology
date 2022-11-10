const express = require('express');
const router = express.Router();
const horoscopeController = require('../controllers/horoscopeController');
const middleware = require("../middleware/authenticateUser");

router.post('/createHoroscope',middleware.authenticateToken,horoscopeController.horoscopeCreate);
router.get('/getAllHoroscopes',middleware.authenticateToken,horoscopeController.getAllHoroscopes);
router.get('/getAllHoroscopeOfOwn',middleware.authenticateToken,horoscopeController.getAllHoroscopeOfOwn);
//router.get('/getHoroscopeById',horoscopeController.getHoroscopeById);
router.put('/updateHoroscope/:id',middleware.authenticateToken,horoscopeController.updateHoroscope);
router.delete('/deleteHoroscope/:id',middleware.authenticateToken,horoscopeController.deleteHoroscope);



module.exports = router;