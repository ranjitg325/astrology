const mongoose = require("mongoose");
//const ObjectId = mongoose.Schema.Types.ObjectId;

const jyotisSchema = new mongoose.Schema(
    {
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
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            street: {
                type: String,
                //required: true,
                trim: true,
            },
            city: {
                type: String,
                //required: true,
                trim: true,
            },
            state: {
                type: String,
                //required: true,
                trim: true,
            },
            pincode: {
                type: Number,
                //required: true,
                trim: true,
            },
        },
        rating: {
            type: String,
            //required:true,
            trim: true
        },
        experience: {
            type: Number,
            default: 0,
            required: true,
            trim: true
        },
        avatar: {
            type: String,
            //required:true,  
        },

        mail_otp: {         //when a user login after registration, he will be asked to verify his email address
            type: String,
            unique: true,
        },
        mobile_otp:{       //when a user login after registration, he will be asked to verify his mobile number
            type:String,
            unique:true,
            },
        otp: {              //when user forgot his password, he will be asked to verify his email address using otp
            type: String,
            unique: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("jyotish", jyotisSchema);