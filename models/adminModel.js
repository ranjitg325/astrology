const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const adminSchema = new mongoose.Schema(
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
    phoneNumber: {
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
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
      pincode: {
        type: Number,
        required: true,
        trim: true,
      },
    },
    mail_otp:{         //when a user login after registration, he will be asked to verify his email address
      type:String,
      unique:true,
    },
  otp:{              //when user forgot his password, he will be asked to verify his email address using otp
      type:String,
      unique:true,
  },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date
    }
    // stores: [
    //   {
    //     type: ObjectId,
    //     ref: "store",
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("admin", adminSchema);
