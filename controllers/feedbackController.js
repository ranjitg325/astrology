const feedbackModel = require('../models/feedbackModel');
const jyotisModel = require('../models/jyotisModel');
const aws = require('../aws/awsForVideo');

exports.feedbackCreate = async (req, res) => {
    try {
        let {
            feedback,
            rating
        } = req.body;
        if(!feedback){
            return res.status(400).send({ status: false, message: "feedback is required" })
        }
        //if rating is not in between 1 to 5
        if(rating && (rating < 1 || rating > 5)){
            return res.status(400).send({ status: false, message: "rating should be in between 1 to 5" })
        }
        const newFeedback = new feedbackModel({
            //userId: req.user.userId,    
            feedback,
            rating
        });
        const feedbackData = await newFeedback.save();
        return res.status(201).send({ message: "feedback created successfully", data: feedbackData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}



exports.getAllFeedback = async (req, res) => {
    try {
        const feedbackCount = await feedbackModel.find({ isDeleted: false }).count();
        const feedbackData = await feedbackModel.find({isDeleted: false });
        return res.status(200).send({ msg: "feedbacks fetched successfully", count: feedbackCount, data: feedbackData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

