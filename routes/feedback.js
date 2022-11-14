const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const feedbackController = require('../controllers/feedbackController');
const middleware = require("../middleware/authenticateUser");

router.post('/createFeedback', middleware.authenticateToken, feedbackController.feedbackCreate);
router.get('/getAllFeedback', middleware.authenticateToken, feedbackController.getAllFeedback);  //for admin
// //router.get('/getAllFeedbackOfOwn',middleware.authenticateToken,feedbackController.getAllFeedbackOfOwn);
// router.put('/updateFeedback/:id',middleware.authenticateToken,feedbackController.updateFeedback);
// router.delete('/deleteFeedback/:id',middleware.authenticateToken,feedbackController.deleteFeedback);

module.exports = router;