const horoscopeModel = require("../models/horoscopeModel");
const adminModel= require("../models/adminModel")
const aws = require('../aws/aws');


exports.horoscopeCreate = async (req, res) => {
    try {
        let {
            //subAdmin,
            zodiacName,
            zodiacDescription,
            horoscopeType,
            horoscopeDescription,
            horoscopeCreatedDate,
            horoscopeValidUpto
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
            horoscopeCreatedDate,
            horoscopeValidUpto,
            subAdmin:req.user.adminId
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
//             subAdmin,
//             zodiacName,
//             zodiacImage,
//             zodiacDescription,
//             todaysHoroscope,
//             weeklyHoroscope,
//             monthlyHoroscope,
//             yearlyHoroscope
//         } = req.body;

//         const horoscopeRequest = {
//             subAdmin,
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
        //const adminId = req.user.adminId;
        //const subAdmin = req.body.subAdmin;
        const horoscopeCount = await horoscopeModel.find({/*subAdmin:subAdmin,*/ isDeleted: false }).count();
        const horoscopeData = await horoscopeModel.find({/* subAdmin : subAdmin,*/isDeleted: false });
        return res.status(200).send({ msg: "horoscopes fetched successfully", count: horoscopeCount, data: horoscopeData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
exports.getAllHoroscopeOfOwn = async (req, res) => {
    try{
        const subAdmin= req.user.adminId;
        const horoscopeCount = await horoscopeModel.find({subAdmin:subAdmin, isDeleted: false }).count();
        const horoscopeData = await horoscopeModel.find({ subAdmin : subAdmin,isDeleted: false });
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
            horoscopeCreatedDate,
            horoscopeValidUpto
        } = req.body;
        let zodiacImage = req.files;
        
        if(req.files && req.files.length > 0){
            zodiacImage = await Promise.all(
                req.files.map(async (file) => {
                    return await aws.uploadToS3(file.buffer);
                })
            );
        }
        const subAdmin = req.user.adminId;
        const updatedHoroscope = await horoscopeModel.findOneAndUpdate(
            { _id: req.params.id, subAdmin: subAdmin },
            {
                zodiacName,
                zodiacImage,
                zodiacDescription,
                horoscopeType,
                horoscopeDescription,
                horoscopeCreatedDate,
                horoscopeValidUpto,
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
        const subAdmin = req.user.adminId;
        const checkHoroscope = await horoscopeModel.findOne({ _id: req.params.id, subAdmin: subAdmin, isDeleted: false });
       if(checkHoroscope){
        const deletedHoroscope = await horoscopeModel.findOneAndUpdate(
            { _id: req.params.id, subAdmin: subAdmin },
            { isDeleted: true, deletedAt: Date.now() },
            { new: true }
        );
        return res.status(200).send({ msg: "horoscope deleted successfully", data: deletedHoroscope });
       }
         else{
            return res.status(400).send({msg:"horoscope not found"});
        }
       // return res.status(200).send({ msg: "horoscope deleted successfully", data: deletedHoroscope });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

