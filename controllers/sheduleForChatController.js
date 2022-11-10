const adminModel= require("../models/adminModel")
const userModel = require("../models/userModel")
const sheduleModel = require("../models/SheduleForChatModel")
const cardModel = require("../models/cardModel")
const videoModel = require("../models/videoModel")
const aws = require("../aws/aws");
const { v4: uuidv4 } = require('uuid');


//shedule a chat for user to astrologer if astrologer time slot is available
exports.sheduleChat = async (req, res) => {
    try {
        let { astrologerId, date, time } = req.body;
        if (!astrologerId || !date || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const astrologer = await adminModel.findById(astrologerId);
        if (!astrologer) {
            return res.status(400).json({ message: "astrologer not found" });
        }
        const user = await userModel.findById(req.user.userId);
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        const shedule = await sheduleModel.findOne({ astrologer: astrologerId, date: date, time: time });
        if (shedule) {
            return res.status(400).json({ message: "astrologer time slot is already booked" });
        }
        const newShedule = new sheduleModel({
            astrologer: astrologerId,
            user: req.user.userId,
            date: date,  
            time: time
        });
        const sheduleData = await newShedule.save();
        return res.status(201).send({ message: "shedule created successfully", data: sheduleData });
    } catch (err) {
        return res.status(500).send(err.message);
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

//at the time of meeting, user and astrologer will redirect to chatLive page
//exports.userAndAstrologerRedirectToChatLivePage = async (req, res) => {
