const mongoose = require('mongoose')

const upcomingFestivalSchema = new mongoose.Schema({
    // jyotish:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'jyotish'
    // },
    festivalName: {
        type: String,
        required: true,
        trim: true
    },
    festivalImage: {
        type: String,
        //required: true,
        trim: true
    },
    festivalDescription: {
        type: String,
        required: true,
        trim: true
    },
    festivalDate: {
        type: String,
        required: true,
        trim: true
    },
    festivalTime: {     // subh mahurat
        type: String,
        //required: true,
        trim: true
    },
    festivalLocation: {   //main location like if ganesh puja then mumbai, diwali then all over india
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

module.exports = mongoose.model("upcomingFestival", upcomingFestivalSchema);