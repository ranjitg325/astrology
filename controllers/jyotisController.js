const jyotisModel = require('../models/jyotisModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailValidator = require("validator")
const transporter = require("../utils/sendMail");
const otpGenerator = require("otp-generator");
const aws = require('../aws/awsForVideo')
const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
  });

exports.createJyotis = async (req, res) => {
    try{
        if (req.files && req.files.length > 0) {
           let{
            firstName,
            lastName,
            phone,
            password,
            address,
            experience
           } = req.body;
           const { email } = req.body
           let avatar = req.files;

           if (!email) {
            return res.status(400).send({ status: false, msg: " email is required" })
        }

        let validemail = await jyotisModel.findOne({ email })
        if (validemail) {
            return res.status(400).send({ status: false, msg: "email id is already exist" })
        }

        const isValidEmail = emailValidator.isEmail(email)
        if (!isValidEmail) {
            return res.status(400).send({ status: false, msg: " invalid email" })
        }
        if (avatar && avatar.length > 0) {
            avatar = await aws.uploadFile(avatar[0]);
        }
        else {
            return res.status(400).send({ status: false, message: "profileImage or avatar is required" })
        }

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt)

        let finalData = {
            firstName,
            lastName,
            email,
            phone,
            password,
            address,
            experience,
            avatar
        }
        const jyotis = new jyotisModel(finalData)
        await jyotis.save()
        res.status(200).send({ status: true, msg: "jyotis created successfully", data : jyotis })
    }
    else {
        let{
            firstName,
            lastName,
            phone,
            password,
            address,
            experience
           } = req.body;
           const { email } = req.body

           if (!email) {
            return res.status(400).send({ status: false, msg: " email is required" })
        }

        let validemail = await jyotisModel.findOne({ email })
        if (validemail) {
            return res.status(400).send({ status: false, msg: "email id is already exist" })
        }

        const isValidEmail = emailValidator.isEmail(email)
        if (!isValidEmail) {
            return res.status(400).send({ status: false, msg: " invalid email" })
        }

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt)

        let finalData = {
            firstName,
            lastName,
            email,
            phone,
            password,
            address,
            experience
    } 
    const jyotis = new jyotisModel(finalData)
    await jyotis.save()
    res.status(200).send({ status: true, msg: "jyotis created successfully" , data: jyotis})
}
    }
    catch(err){
        return res.status(500).json({msg: err.message})
    }
}


exports.send_otp_phone = async (req, res) => {
    try {
      const userMail = req.body.phone;
      const userData = await jyotisModel.findOne({ phone: userMail });
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
        const fromPhone = "rj Ranjit Solutions";
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
  
        await jyotisModel.updateOne(
          { phone: userMail },
          { $set: { mobile_otp: mail_otp } }
        );
  
      await jyotisModel.updateOne(
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


  exports.login = async (req, res) => {  //not working
    try {
      const userEmail = req.body.email||req.body.phone;
      let userOtp = req.body.otp;
      let dataExist;
      if(userEmail.includes("@")){
         dataExist = await jyotisModel.findOne({ email: userEmail });
      }
      else{
         dataExist = await jyotisModel.findOne({ phone: userEmail });
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
      const payload = { userId: _id, /*email: userEmail,*/phone: userEmail };
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
        const customerData = await jyotisModel.findOne({ email: email });
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
        await jyotisModel.findOneAndUpdate(
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
        const customerData = await jyotisModel.findOne({ email: email });
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
            await jyotisModel.findOneAndUpdate(
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


exports.updateJyotis = async (req, res) => {
    try {

        const userId = req.user.userId;
        let {
            firstName,
            lastName,
            email,
            phone,
            password,
            address,
            experience
        } = req.body;
        const jyotisData = await jyotisModel.findOne({ _id: userId });
       
        if (password) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
        }

        if (jyotisData.isDeleted == true) {
            return res.status(400).send({ message: "user is not registered, register first" });
        }

        const updatedData = await jyotisModel.findOneAndUpdate(
            { _id: userId, isDeleted: false },
            {
                firstName: firstName || jyotisData.firstName,
                lastName: lastName || jyotisData.lastName,
                email: email || jyotisData.email,
                phone: phone || jyotisData.phone,
                password: password || jyotisData.password,
                address: address || jyotisData.address,
                experience: experience || jyotisData.experience
            },
            { new: true }
        );
        return res.status(200).send({ message: "user updated successfully", data :updatedData }); 
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.deleteJyotis = async (req, res) => {
    try {
        const userId = req.user.userId;
        const jyotisData = await jyotisModel.findOne({ _id: userId,isDeleted: false });
        if (jyotisData.isDeleted == true) {
            return res.status(400).send({ message: "user is not registered, register first" });
        }
       const deleteUser= await jyotisModel.findOneAndUpdate({ _id: userId, isDeleted: false }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });
        return res.status(200).send({ message: "user deleted successfully", data :deleteUser });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}


exports.getOwnProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const jyotisData = await jyotisModel.findOne({ _id: userId,isDeleted: false });
        if (jyotisData.isDeleted == true) {
            return res.status(400).send({ message: "user is not registered, register first" });
        }
        return res.status(200).send({ message: "user profile", data :jyotisData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}