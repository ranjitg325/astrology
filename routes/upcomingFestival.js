const express = require('express');
const router = express.Router();
const upcomingFestivalController = require('../controllers/upcomingFestivalController');
const middleware = require("../middleware/authenticateUser");

router.post('/createUpcomingFestival', middleware.authenticateToken,upcomingFestivalController.upcomingFestivalCreate);
router.get('/getAllUpcomingFestivals', middleware.authenticateToken,upcomingFestivalController.getAllUpcomingFestivals);
//router.get('/getUpcomingFestivalById', /*middleware.authenticateToken,*/upcomingFestivalController.getUpcomingFestivalById);
router.put('/updateUpcomingFestival/:id', middleware.authenticateToken,upcomingFestivalController.updateUpcomingFestival);
router.delete('/deleteUpcomingFestival/:id',middleware.authenticateToken, upcomingFestivalController.deleteUpcomingFestival);

module.exports = router;



