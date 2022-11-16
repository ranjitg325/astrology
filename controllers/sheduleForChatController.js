const adminModel= require("../models/adminModel")
const jyotisModel = require("../models/jyotisModel")
const userModel = require("../models/userModel")
const sheduleModel = require("../models/SheduleForChatModel")
const cardModel = require("../models/cardModel")
const videoModel = require("../models/videoModel")
const aws = require("../aws/aws");

exports.sheduleChat = async (req, res) => {
    try {
        let { jyotishId, date, time } = req.body;
        if (!jyotishId || !date || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const jyotish = await jyotisModel.findById(jyotishId);
        if (!jyotish) {
            return res.status(400).json({ message: "astrologer not found" });
        }
        const user = await userModel.findById(req.user.userId);
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        const shedule = await sheduleModel.findOne({ jyotish: jyotishId, date: date, time: time });
        if (shedule) {
            return res.status(400).json({ message: "astrologer time slot is already booked" });
        }
       
        const availableDates = jyotish.availableDates;
        const availableStartTime = jyotish.availableStartTime;
        const availableEndTime = jyotish.availableEndTime;
        const startTime = new Date(availableStartTime);
        const endTime = new Date(availableEndTime);
        const sheduleTime = new Date(time);
        
        if (!availableDates.includes(date)) {
            return res.status(400).json({ message: "astrologer is not available on this date" });
        }
        if (sheduleTime < startTime || sheduleTime > endTime) {
            return res.status(400).json({ message: "astrologer is not available at this time" });
        }

        const newShedule = new sheduleModel({
            jyotish: jyotishId,
            user: req.user.userId,
            date: date,
            time: time
        });
        const sheduleData = await newShedule.save();
        return res.status(200).json({ message: "shedule created successfully", data: sheduleData });
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

 exports.acceptMeeting = async (req, res) => {
        try {
            let { sheduleId } = req.body;
            if (!sheduleId) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const shedule = await sheduleModel.findOne({_id: sheduleId, isAccepted: "pending" });
            if (!shedule) {
                return res.status(400).json({ message: "shedule not found" });
            }
            shedule.isAccepted = "accepted";
            const sheduleData = await shedule.save();
            return res.status(201).send({ message: "shedule accepted successfully", data: sheduleData });
        } catch (err) {
            return res.status(500).send(err.message);
        }
 }


