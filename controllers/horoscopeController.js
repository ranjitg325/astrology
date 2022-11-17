const horoscopeModel = require("../models/horoscopeModel");
const adminModel= require("../models/adminModel")
const aws = require('../aws/aws');


exports.horoscopeCreate = async (req, res) => {
    try {
        let {
            //jyotish,
            zodiacName,
            zodiacDescription,
            horoscopeType,
            horoscopeDescription,
            // horoscopeCreatedDate,
            // horoscopeValidUpto
        } = req.body;
        let zodiacImage = req.files;
        if( !zodiacName || !zodiacDescription || !horoscopeType || !horoscopeDescription || !horoscopeValidUpto){
            return res.status(400).send({ msg: "Please fill all the required fields" });
        }
        if(req.files && req.files.length > 0){
            zodiacImage = await Promise.all(
                req.files.map(async (file) => {
                    return await aws.uploadToS3(file.buffer);
                })
            );
        }

        const newHoroscope = new horoscopeModel({   
            zodiacName,
            zodiacImage,
            zodiacDescription,
            horoscopeType,
            horoscopeDescription,
            // horoscopeCreatedDate,
            // horoscopeValidUpto,
            //jyotish:req.user.userId
        });
        const horoscopeData = await newHoroscope.save();
        return res.status(200).send({ msg: "horoscope created successfully", data: horoscopeData });
    } catch (err) {
        return res.status(500).send(err.message);         
    }
}

// exports.horoscopeCreate = async (req, res) => {
//     try {
//         const adminId = req.user.userId;
//         const adminData = await adminModel.findOne({ _id: adminId });
//         if (!adminData) {
//           return res.status(401).send({ message: "You are not authorized" });
//         }
      
//         let {
//             jyotish,
//             zodiacName,
//             zodiacImage,
//             zodiacDescription,
//             todaysHoroscope,
//             weeklyHoroscope,
//             monthlyHoroscope,
//             yearlyHoroscope
//         } = req.body;

//         const horoscopeRequest = {
//             jyotish,
//             zodiacName,
//             zodiacImage,
//             zodiacDescription,
//             todaysHoroscope,
//             weeklyHoroscope,
//             monthlyHoroscope,
//             yearlyHoroscope
//         };
//         const horoscopeData = await horoscopeModel.create(horoscopeRequest);
//         return res
//             .status(201)
//             .send({ message: "horoscope created successfully", data: horoscopeData });
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// };

exports.getAllHoroscopes = async (req, res) => {
    try {
        //const jyotish = req.user.userId;
        const horoscopeCount = await horoscopeModel.find({/*jyotish:jyotish,*/ isDeleted: false }).count();
        const horoscopeData = await horoscopeModel.find({/* jyotish : jyotish,*/isDeleted: false });
        return res.status(200).send({ msg: "horoscopes fetched successfully", count: horoscopeCount, data: horoscopeData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
exports.getAllHoroscopeOfOwn = async (req, res) => {
    try{
        //const jyotish= req.user.userId;
        const horoscopeCount = await horoscopeModel.find({/*jyotish:jyotish,*/ isDeleted: false }).count();
        const horoscopeData = await horoscopeModel.find({ /*jyotish : jyotish,*/isDeleted: false });
        return res.status(200).send({ msg: "horoscopes fetched successfully", count: horoscopeCount, data: horoscopeData });
    }catch(err){
        return res.status(500).send(err.message);
    }
}
// exports.getHoroscopeById = async (req, res) => {
//     try {
//         const horoscopeId = req.body.horoscopeId;
//         const horoscopeData = await horoscopeModel.findOne({ _id: horoscopeId });
//         return res.status(200).send({ msg: "horoscope fetched successfully", data: horoscopeData });
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// }

exports.updateHoroscope = async (req, res) => {
    try{
        let {
            zodiacName,
            zodiacDescription,
            horoscopeType,
            horoscopeDescription,
            // horoscopeCreatedDate,
            // horoscopeValidUpto
        } = req.body;
        let zodiacImage = req.files;
        
        if(req.files && req.files.length > 0){
            zodiacImage = await Promise.all(
                req.files.map(async (file) => {
                    return await aws.uploadToS3(file.buffer);
                })
            );
        }
        //const jyotish = req.user.userId;
        const updatedHoroscope = await horoscopeModel.findOneAndUpdate(
            { _id: req.params.id, /*jyotish: jyotish*/ },
            {
                zodiacName,
                zodiacImage,
                zodiacDescription,
                horoscopeType,
                horoscopeDescription,
                //horoscopeCreatedDate,
                //horoscopeValidUpto,
            },
            { new: true }
        );
            if(!updatedHoroscope){
                return res.status(400).send({msg:"horoscope not found"});
            }
            return res.status(200).send({ msg: "horoscope updated successfully", data: updatedHoroscope });
    }
    catch(err){
        return res.status(500).send(err.message);
    }
}

exports.deleteHoroscope = async (req, res) => {
    try {
        //const jyotish = req.user.userId;
        const checkHoroscope = await horoscopeModel.findOne({ _id: req.params.id, /*jyotish: jyotish,*/ isDeleted: false });
       if(checkHoroscope){
        const deletedHoroscope = await horoscopeModel.findOneAndUpdate(
            { _id: req.params.id, /*jyotish: jyotish*/ },
            { isDeleted: true, deletedAt: Date.now() },
            { new: true }
        );
        return res.status(200).send({ msg: "horoscope deleted successfully", data: deletedHoroscope });
       }
         else{
            return res.status(400).send({msg:"horoscope not found"});
        }
     
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

