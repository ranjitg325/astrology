//create a feedback model for the user about the app

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const feedback = new mongoose.Schema(
    {
        // userId: {
        //     type: ObjectId,
        //     ref: "user",
        //     required: true,
        // },
        feedback: {
            type: String,
            required: true,
        },
        //rating between 1 to 5
        rating: {
            type: Number,
            //required: true,
            min: 1,
            max: 5,
            default: null
        },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
    },
    { timestamps: true }
);

module.exports = mongoose.model("feedback", feedback);