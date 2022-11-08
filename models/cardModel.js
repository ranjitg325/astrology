const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    subAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'admin'
    },
    zodiacName: {
        type: String, enum: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"],
        required: true,
        trim: true
    },
    zodiacImage: {
        type: Array,
        //required: true,
        //trim: true
    },
    // cardName: {    //card name is like card's heading
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    // cardImage: {
    //     type: Array,
    //     //required: true,
    //    // trim: true
    // },
    // cardDescription: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    //todaysCard, weeklyCard, monthlyCard, yearlyCard do it in enum
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




    //     type: String, enum : ['love','career','health','finance','family','travel','education','business'],
    //     required: true,
    //     trim: true
    // },
    //accordig to cardType, we will show the prediction
    //    cardPrediction: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     },

    //write card type and card prediction in array of objects
    // cardTypeAndPrediction: [{
    //     type: String,
    //     enum : ['todaysCard','weeklyCard','monthlyCard','yearlyCard'],
    //     prediction: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     }
    // }],

    // cardHeading: {
    //     type: String,
    //     required: true,
    //     trim: true
    // }, 
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("card", cardSchema);