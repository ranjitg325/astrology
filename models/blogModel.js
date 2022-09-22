const mongoose = require('mongoose')

const blogschema = new mongoose.Schema({
    image:{
        type: String
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{            //a small discription of the blog
        type: String,
        required: true,
        trim: true
    },
    content:{                //the full blog will be write here
        type: String,
        required: true,
        trim: true
    },
    category:{
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

module.exports = mongoose.model("blog", blogschema);


