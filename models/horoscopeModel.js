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
   
   
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("horoscope", horoscopeSchema);