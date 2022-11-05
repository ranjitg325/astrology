const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const middleware = require("../middleware/authenticateUser");


router.post('/cardCreate',/* middleware.authenticateToken,*/cardController.cardCreate);
router.get('/getAllCards', /*middleware.authenticateToken,*/cardController.getAllCards);
router.get('/getCardById',/* middleware.authenticateToken,*/cardController.getCardById);
router.put('/updateCard', /*middleware.authenticateToken,*/cardController.updateCard);
router.delete('/deleteCard',/*middleware.authenticateToken,*/ cardController.deleteCard);


module.exports = router;