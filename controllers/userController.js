const userModel = require("../models/userModel.js")
const cardModel = require("../models/cardModel.js");
const horoscopeModel = require("../models/horoscopeModel.js");
const sheduleChatModel = require("../models/SheduleForChatModel");
const emailValidator = require('validator')
const transporter = require("../utils/sendMail");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
});

exports.user_signup = async (req, res) => {
    try {
        let {
            firstName,
            lastName,
            gender,
            dateOfBirth,
            phone,
            password,
            address
        } = req.body;
        let email = req.body.email;
        if (!email) {
            return res.status(400).send({ status: false, msg: " Email is required" })
        }
        const isValidEmail = emailValidator.isEmail(email)
        if (!isValidEmail) {
            return res.status(400).send({ status: false, msg: " invalid email" })
        }
        const dataExist = await userModel.findOne({ email: email });
        if (dataExist) {
            return res.status(400).send({ message: "email already in use" });
        }
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const userRequest = {
            firstName,
            lastName,
            gender,
            dateOfBirth,
            phone,
            email,
            password,
            address
        };
        const userData = await userModel.create(userRequest);
        return res
            .status(201)
            .send({ message: "User signup successfully", data: userData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};


// exports.send_otp_toEmail = async (req, res) => {
//     try {
//         const userMail = req.body.email;
//         const userData = await userModel.findOne({ email: userMail });
//         if (!userData) {
//             return res
//                 .status(400)
//                 .send({ setting: { success: "0", message: "not valid user" } });
//         }
//         let mail_otp = otpGenerator.generate(4, {
//             upperCaseAlphabets: false,
//             specialChars: false,
//             lowerCaseAlphabets: false,
//         });

//         console.log(process.env.AUTH_EMAIL, process.env.AUTH_PASS);
//         await transporter.sendMail({
//             from: process.env.AUTH_EMAIL,
//             to: userMail,
//             subject: "OTP",
//             text: `Your OTP is ${mail_otp} to login into your account`,
//         });

//         const salt = await bcrypt.genSalt(10);
//         mail_otp = await bcrypt.hash(mail_otp, salt);

//         await userModel.updateOne(
//             { email: userMail },
//             { $set: { mail_otp: mail_otp } }
//         );

//         return res
//             .status(200)
//             .send({ setting: { success: "1", message: "otp sent successfully" } });
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// };

exports.send_otp_toEmail = async (req, res) => {
    try {
      const userMail = req.body.phone;
      const userData = await userModel.findOne({ phone: userMail });
      if (!userData) {
        return res.status(400).send({ msg: "not valid user" }); 
      }
      // OTP Generation
      let mail_otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      
      const to = userMail;
      const subject = "OTP for phone Verification";
      const text = `Your OTP is ${mail_otp}`;
  
        if(userMail.length == 10){
          var toPhone = "91".concat(userMail);
        }
        const fromPhone = "Kuldeep Solutions";
        console.log(fromPhone, toPhone, text);
        await vonage.message.sendSms(fromPhone, toPhone, text, (err, responseData) => {
          if (err) {
              console.log(err);
          } else {
              if(responseData.messages[0]['status'] === "0") {
                  console.log("Message sent successfully.");
                  // res.send(`Otp Sent To your ${to}` );
              } else {
                  console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
              }
          }
        });
    
        const salt = await bcrypt.genSalt(10);
        mail_otp = await bcrypt.hash(mail_otp, salt);
  
        await userModel.updateOne(
          { phone: userMail },
          { $set: { mobile_otp: mail_otp } }
        );
  
      await userModel.updateOne(
        { email: userMail },
        { $set: { mail_otp: mail_otp } }
      );
  
      return res
        .status(200)
        .send({ setting: { success: "1", message: "otp sent successfully" } });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

// exports.login = async (req, res) => {
//     try {
//         const userEmail = req.body.email;
//         const userOtp = req.body.otp;

//         const dataExist = await userModel.findOne({ email: userEmail });
//         if (!dataExist)
//             return res.status(404).send({ message: "user dose not exist" });
//         const { _id, firstName, lastName } = dataExist;

//         const validOtp = await bcrypt.compare(userOtp, dataExist.mail_otp);
//         if (!validOtp) return res.status(400).send({ message: "Invalid OTP" });
//         const payload = { userId: _id, email: userEmail };
//         const generatedToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, /*{  expiresIn: "10080m",}*/); //in final code push remove the comment expires in time
//         res.header("jwt-token", generatedToken);
//         return res
//             .status(200)
//             .send({
//                 message: `${firstName} ${lastName} you are logged in Successfully`,
//                 Token: generatedToken,
//             });
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// };

exports.login = async (req, res) => {  //not working
    try {
      const userEmail = req.body.email||req.body.phone;
      let userOtp = req.body.otp;
      let dataExist;
      if(userEmail.includes("@")){
         dataExist = await userModel.findOne({ email: userEmail });
      }
      else{
         dataExist = await userModel.findOne({ phone: userEmail });
      }
        
      console.log(dataExist);
      if (!dataExist)
        return res.status(404).send({ message: "user dose not exist" });
  
      const { _id, firstName, lastName } = dataExist;
      //let compareOtp = dataExist.mail_otp||dataExist.mobile_otp
      //const validOtp = await bcrypt.compare(userOtp , compareOtp)
      const validOtp = await bcrypt.compare(userOtp, dataExist.mail_otp || dataExist.mobile_otp);
        if (!validOtp) return res.status(400).send({ message: "Invalid OTP" });
    //   .then((err)=>{
    //     if(err) throw err;
    //   }).catch(()=> console.log("OTP Matched"));
      const payload = { userId: _id, email: userEmail,phone: userEmail };
      const generatedToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "10080m",
      });
      //res.header("jwt-token", generatedToken);
      return res
        .status(200)
        .send({
          message: `${firstName} ${lastName} you are logged in Successfully`,
          Token: generatedToken,
        });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

exports.logout = async (req, res) => {    //not working test again later
    try {
        res.redirect("/user/login");
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const customerData = await userModel.findOne({ email: email });
        if (!customerData) {
            return res.status(400).send({ message: "email is not valid" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Forgot Password",
            html: `<h1>OTP for forgot password is ${otp}</h1>`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info);
            }
        });
        await userModel.findOneAndUpdate(
            { email: email },
            { otp: otp, otpTime: Date.now() }
        );
        return res.status(200).send({ message: "OTP sent to your email", email });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;
        const customerData = await userModel.findOne({ email: email });
        if (!customerData) {
            return res.status(400).send({ message: "email is not valid" });
        }
        if (!otp) {
            return res.status(400).send({ message: "otp is required" });
        }
        if (customerData.otp == otp) {
            if (Date.now() - customerData.otpTime > 300000) {
                return res.status(400).send({ message: "OTP expired" });
            }
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt);
            await userModel.findOneAndUpdate(
                { email: email },
                { password: newPassword }
            );
            return res
                .status(200)
                .send({ message: "Password updated successfully" });
        }
        else {
            return res.status(400).send({ message: "OTP is not correct" });
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
};


exports.userUpdate = async (req, res) => {
    try {

        const userId = req.user.userId;
        let {
            firstName,
            lastName,
            gender,
            dateOfBirth,
            phone,
            email,
            password,
            address,
            isDeleted
        } = req.body;
        const userData = await userModel.findOne({ _id: userId });
        if (password) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
        }
        // if (address) {
        //         if (address.street) {
        //             address.street = address.street;
        //         }
        //         if (address.city) {
        //             address.city = address.city;
        //         }
        //         if (address.pincode) {
        //             address.pincode = address.pincode;  
        //         }
        // }
        if (userData.isDeleted == true) {
            return res.status(400).send({ message: "user is not registered, register first" });
        }
        const updatedData = await userModel.findOneAndUpdate(
            { _id: userId, isDeleted: false },
            {
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                dateOfBirth: dateOfBirth,
                phone: phone,
                email: email,
                password: password,
                address: address,
                isDeleted: isDeleted,
            }, { new: true }
        );
        return res
            .status(200)
            .send({ message: "user profile update successfully", data: updatedData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};


exports.getAllUser = async (req, res) => {
    try {
        let count = await userModel.find({ isDeleted: false }).count();
        const user = await userModel.find({ isDeleted: false });
        return res.status(200).send({ message: "all user list", count: count, data: user });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.getUserById = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await userModel.findById(userId);
        return res.status(200).send({ message: "user details", data: user });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const checkUser = await userModel.find({ _id: userId, isDeleted: false });
        if (checkUser) {
            const user = await userModel.updateOne({ _id: userId, isDeleted: false }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });
            res.status(200).send({ msg: "deleted successfully", data: user });
        } else {
            res.status(400).send({ error: 'user not found' });
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
}


exports.getOwnProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await userModel.findById(userId).select('-password');
        return res.status(200).send({ message: "user details", data: user });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

//from card model
exports.getPredictionByCardTypeAndPredictionType = async (req, res) => {
    try {
        if(req.body.cardType == "todaysCard"){
        const { zodiacName, cardType, predictionTypeAndDescription } = req.body;
        const prediction = await cardModel.find({
            zodiacName: zodiacName, cardType: cardType,
            predictionTypeAndDescription:
            {
                $elemMatch: { predictionType: predictionTypeAndDescription }
            },
            //show the data only created at after 12:00 am
            createdAt: { $gte: new Date(new Date().setHours(0, 0, 0)) }
        });
        return res.status(200).send({ message: "prediction details", data: prediction });
        }
        else if(req.body.cardType == "weeklyCard"){
            const { zodiacName, cardType, predictionTypeAndDescription } = req.body;
            const prediction = await cardModel.find({
                zodiacName: zodiacName, cardType: cardType,
                predictionTypeAndDescription:
                {
                    $elemMatch: { predictionType: predictionTypeAndDescription }
                },
                //if the user want to see weekly data then fetch the data creates after 12:00 am on any monday of the week and every new week of monday dont show the last week data
                createdAt: { $gte: new Date(new Date().setHours(0, 0, 0)).setDate(new Date(new Date().setHours(0, 0, 0)).getDate() - new Date(new Date().setHours(0, 0, 0)).getDay() + 1) }
                
            });
            return res.status(200).send({ message: "prediction details", data: prediction });
            }
            else if(req.body.cardType == "monthlyCard"){
                const { zodiacName, cardType, predictionTypeAndDescription } = req.body;
                const prediction = await cardModel.find({
                    zodiacName: zodiacName, cardType: cardType,
                    predictionTypeAndDescription:
                    {
                        $elemMatch: { predictionType: predictionTypeAndDescription }
                    },
                    //if the user want to see monthly data then fetch the data creates after 12:00 am on any 1st of the month and every new month of 1st dont show the last month data
                    createdAt: { $gte: new Date(new Date().setHours(0, 0, 0)).setDate(1) }
                });
                return res.status(200).send({ message: "prediction details", data: prediction });
                }
                else if(req.body.cardType == "yearlyCard"){
                    const { zodiacName, cardType, predictionTypeAndDescription } = req.body;
                    const prediction = await cardModel.find({
                        zodiacName: zodiacName, cardType: cardType,
                        predictionTypeAndDescription:
                        {
                            $elemMatch: { predictionType: predictionTypeAndDescription }
                        },
                       //if the user want to see yearly data then fetch the data creates after 12:00 am on any 1st of the january and every new year of 1st january dont show the last year data
                        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0)).setMonth(0).setDate(1) }
                    });
                    return res.status(200).send({ message: "prediction details", data: prediction });
                    }
             
    } catch (err) {
        return res.status(500).send(err.message);
    }
}


//from horoscope model
exports.getHoroscopeByType = async (req, res) => {
    try {
        if (req.body.horoscopeType == "today") {
            const { zodiacName, horoscopeType } = req.body;
            const horoscope = await horoscopeModel.find({
                zodiacName: zodiacName, horoscopeType: horoscopeType,
                //show the data only created at after 12:00 am
                createdAt: { $gte: new Date(new Date().setHours(0, 0, 0)) }
            });
            return res.status(200).send({ message: "horoscope details", data: horoscope });
        }
        else if (req.body.horoscopeType == "weekly") {
            const { zodiacName, horoscopeType } = req.body;
            const horoscope = await horoscopeModel.find({
                zodiacName: zodiacName, horoscopeType: horoscopeType,
                //if the user want to see weekly data then fetch the data creates after 12:00 am on any monday of the week and every new week of monday dont show the last week data
                createdAt: { $gte: new Date(new Date().setHours(0, 0, 0)).setDate(new Date(new Date().setHours(0, 0, 0)).getDate() - new Date(new Date().setHours(0, 0, 0)).getDay() + 1) }
            });
            return res.status(200).send({ message: "horoscope details", data: horoscope });
        }
        else if (req.body.horoscopeType == "monthly") {
            const { zodiacName, horoscopeType } = req.body;
            const horoscope = await horoscopeModel.find({
                zodiacName: zodiacName, horoscopeType: horoscopeType,
                //if the user want to see monthly data then fetch the data creates after 12:00 am on any 1st of the month and every new month of 1st dont show the last month data
                createdAt: { $gte: new Date(new Date().setHours(0, 0, 0)).setDate(1) }
            });
            return res.status(200).send({ message: "horoscope details", data: horoscope });
        }
        else if (req.body.horoscopeType == "yearly") {
            const { zodiacName, horoscopeType } = req.body;
            const horoscope = await horoscopeModel.find({
                zodiacName: zodiacName, horoscopeType: horoscopeType,
                //if the user want to see yearly data then fetch the data creates after 12:00 am on any 1st of the january and every new year of 1st january dont show the last year data
                createdAt: { $gte: new Date(new Date().setHours(0, 0, 0)).setMonth(0).setDate(1) }
            });
            return res.status(200).send({ message: "horoscope details", data: horoscope });
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

//cancel sheduled meeting with astrologer by user
exports.cancelMeeting = async (req, res) => {
    try {
        const user = req.user.userId
        const { meetingId } = req.body;
        const meeting = await sheduleChatModel.findOneAndUpdate({ _id: meetingId, user:user }, { cancelMeeting: true });
        return res.status(200).send({ message: "meeting cancelled successfully", data : meeting });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}