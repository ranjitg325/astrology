const upcomingFestivalModel = require("../models/upcomingFestivalModel");
const adminModel= require("../models/adminModel")
const aws = require("../aws/awsForVideo");

exports.upcomingFestivalCreate = async (req, res) => {
    try {
        let {
            festivalName,
            festivalDescription,
            festivalDate,
            festivalTime,   
            festivalLocation
        } = req.body;
        let festivalImage = req.files;

        if(festivalImage && festivalImage.length > 0){
            festivalImage = await aws.uploadFile(festivalImage[0]);
        }
        else{
            return res.status(400).send({ msg: "Please upload festival image" });
        }
        const newFestival = new upcomingFestivalModel({
            //jyotish : req.user.userId,
            festivalName,
            festivalImage,
            festivalDescription,
            festivalDate,
            festivalTime,
            festivalLocation
        });
        const upcomingFestivalData = await newFestival.save();
        return res.status(200).send({ msg: "upcomingFestival created successfully", data: upcomingFestivalData });
    } catch (err) {
        return res.status(500).send(err.message);
        }
    }


exports.getAllUpcomingFestivals = async (req, res) => {
    try {
        //const jyotish = req.user.userId;
        const upcomingFestivalCount = await upcomingFestivalModel.find({/*jyotish:jyotish,*/ isDeleted: false }).count();
        const upcomingFestivalData = await upcomingFestivalModel.find({/* jyotish : jyotish,*/isDeleted: false });
        return res.status(200).send({ msg: "upcomingFestivals fetched successfully", count: upcomingFestivalCount, data: upcomingFestivalData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

// exports.getUpcomingFestivalById = async (req, res) => {
//     try {
//         const upcomingFestivalId = req.body.upcomingFestivalId;
//         const upcomingFestivalData = await upcomingFestivalModel.findOne({ _id: upcomingFestivalId });
//         return res.status(200).send({ msg: "upcomingFestival fetched successfully", data: upcomingFestivalData });
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// };

exports.updateUpcomingFestival = async (req, res) => {
    try {
        const upcomingFestivalId = req.params.id;
        let {
            festivalName,
            festivalDescription,
            festivalDate,
            festivalTime,
            festivalLocation
        } = req.body;
        let festivalImage = req.files;
        if(festivalImage && festivalImage.length > 0){
            festivalImage = await aws.uploadFile(festivalImage[0]);
        }
        else{
            return res.status(400).send({ msg: "Please upload festival image" });
        }
        const upcomingFestivalData = await upcomingFestivalModel.findOneAndUpdate({ _id: upcomingFestivalId,isDeleted:false }, {
            festivalName,
            festivalImage,
            festivalDescription,
            festivalDate,
            festivalTime,
            festivalLocation
        }, { new: true });
        if(!upcomingFestivalData){
            return res.status(400).send({ msg: "upcomingFestival not found" });
        }
        return res.status(200).send({ msg: "upcomingFestival updated successfully", data: upcomingFestivalData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.deleteUpcomingFestival = async (req,res) => {
    try{
        const upcomingFestivalId = req.params.id;
        const upcomingFestivalData = await upcomingFestivalModel.findOneAndUpdate({_id: upcomingFestivalId,isDeleted:false},{
            isDeleted:true, deletedAt: new Date() 
        },{new:true});
        if(!upcomingFestivalData){
            return res.status(400).send({msg:"upcomingFestival not found"});
        }
        return res.status(200).send({msg:"upcomingFestival deleted successfully",data:upcomingFestivalData});
    }
    catch(err){
        return res.status(500).send(err.message);
    }
}