const mongoose = require('mongoose')

const horoscopeSchema = new mongoose.Schema({
    // subAdmin:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'admin'
    // },
    zodiacName: {    
        type: String,
        required: true,
        trim: true
    },
    zodiacImage: {
        type: String,
        //required: true,
        trim: true
    },
    zodiacDescription: {
        type: String,
        required: true,
        trim: true
    },
    todaysHoroscope: {
        type: String,
        // required: true,
         trim: true
    },
    weeklyHoroscope: {
        type: String,
        //required: true,
        trim: true
    },
    monthlyHoroscope: {
        type: String,
        //required: true,
        trim: true
    },
    yearlyHoroscope: {
        type: String,
        //required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("horoscope", horoscopeSchema);