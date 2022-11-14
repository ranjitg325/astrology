//fix a time by user when he/she want to chat with astrologer

const mongoose = require('mongoose')

const sheduleSchema = new mongoose.Schema({
    jyotish: {
        type: mongoose.Types.ObjectId,
        ref: "jyotish",
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    date: {   
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    //if astologer accept the request then it will be true
    isAccepted: {
        type: String,
        enum : ['pending','accepted','rejected'],
        default: 'pending'
    },
   
    cancelMeeting: {  //if user cancel the meeting then it will be true
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        //required:true,
        min: 1,
        max: 5,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("shedule", sheduleSchema)