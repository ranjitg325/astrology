const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const middleware = require("../middleware/authenticateUser");


router.post('/cardCreate', middleware.authenticateToken,cardController.cardCreate);
router.get('/getCardByType', middleware.authenticateToken,cardController.getCardByType);  //today,tomorrow,weekly,monthly,yearly
router.get('/getAllCardsOfOwn', middleware.authenticateToken,cardController.getAllCardsOfOwn);
router.get('/getAllCards', middleware.authenticateToken,cardController.getAllCards);
//router.get('/getCardById',/* middleware.authenticateToken,*/cardController.getCardById);
router.put('/updateCard/:id', middleware.authenticateToken,cardController.updateCard);
router.delete('/deleteCard/:id',middleware.authenticateToken, cardController.deleteCard);


module.exports = router; 