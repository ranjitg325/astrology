const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    gender: { 
        type: String, 
        required:true,
        enum: ["male", "female", "other"] 
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique : true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        //match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/, 'Min length should be 8 and max length should be 15']
    
    },

    
    address: {
        street: { type: String ,trim: true},
        city: { type: String, trim: true },
        pincode: { type: String }
    },

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date }
}, { timestamps: true })

module.exports = mongoose.model('userCreate', userSchema)