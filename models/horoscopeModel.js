const mongoose = require('mongoose')

const horoscopeSchema = new mongoose.Schema({
    // jyotish:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'jyotish'
    // },
    zodiacName: {    
        type: String,
        enum: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"],
        required: true,
        trim: true
    },
    zodiacImage: {
        type: Array,
        //required: true,
        trim: true
    },
    zodiacDescription: {
        type: String,
        required: true,
        trim: true
    },
    horoscopeType: {
        type: String,
        enum : ['today','tomorrow','weekly','monthly','yearly'],
        required: true,
        trim: true
    },
    horoscopeDescription: {
        type: String,
        required: true,
        trim: true
    },
    //horoscope created date and horoscope valid upto date
    // horoscopeCreatedDate: {
    //     type: Date,
    //     //required: true,
    //     default: Date.now,
    //     trim: true
    // },
    
    //horoscope valid upto today, weekly, monthly, yearly is 1 day, 7 days, 30 days, 365 days inside the enum
    // horoscopeValidUpto: {  //date ek din minus hoke save ho raha hai
    //  // horoscope valid upto midnight 11:59:59
    //     type: Date,
    //     //required: true,
    //     trim: true
    // },
    
    // horoscopeValidUptoDate: {
    //     type: Date,
    //     required: true,
    //     trim: true
    // },

    // horoscopeDate: {
    //     type: Date,
    //     default: Date.now
    // },
   
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("horoscope", horoscopeSchema);