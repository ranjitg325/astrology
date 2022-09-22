const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    // subAdmin:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'admin'
    // },
    cardName: {    //card name is like card's heading
        type: String,
        required: true,
        trim: true
    },
    cardImage: {
        type: String,
        //required: true,
        trim: true
    },
    cardDescription: {
        type: String,
        required: true,
        trim: true
    },
    todaysCard: {
        type: String,
        // required: true,
         trim: true
    },
    weeklyCard: {
        type: String,
        //required: true,
        trim: true
    },
    monthlyCard: {
        type: String,
        //required: true,
        trim: true
    },
    yearlyCard: {
        type: String,
        //required: true,
        trim: true
    },
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