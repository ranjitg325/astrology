const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
    {
        /*jyotish: {
            required: true,
             type: mongoose.Types.ObjectId,
              ref: "jyotish" 
            },*/
        video: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
            //required: true,
        },
        // likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
        // comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
        // shares: [{ type: mongoose.Types.ObjectId, ref: "user" }],
        // sharesCount: { type: Number, default: 0 },
        // report: [{ type: mongoose.Types.ObjectId, ref: "user" }],
        // isReported: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
        
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("video", videoSchema);
