const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    // subAdmin: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'admin'
    // },
  
    cardTitle: {
        type: String,
        required: true,
        trim: true,
      },
      cardImage: {
        type: String,
        required: true,
        trim: true,
      },
      zodiacName: {
        type: String, enum: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"],
        required: true,
        trim: true
    },
   
    cardType: {
        type: String, enum: ['todaysCard', 'weeklyCard', 'monthlyCard', 'yearlyCard'],
        required: true,
        trim: true
    },
    predictionTypeAndDescription: [
        {
            predictionType: {
                type: String,
                enum: ["love", "career", "health", "finance", "family", "travel", "education", "business", "marriage", "children", "property", "legal", "other"],
                required: true,
                trim: true
            },
            description: {
                type: String,
                required: true,
                trim: true
            },
            _id : false
        }
    ],


    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("card", cardSchema);