
const videoModel = require('../models/videoModel')
const adminModel = require('../models/adminModel');
const aws = require('../aws/awsForVideo');

exports.createVideo = async (req, res) => {
    try {
        const { caption } = req.body;
        let video = req.files;
        // const user = await adminModel.findById(req.user.adminId);
        // if (!user) {
        //     return res.status(400).json({  msg: 'Admin not found' });
        // }
        //const reel = await aws.upload(video);
        if (video && video.length > 0) {
            video = await aws.uploadFile(video[0]);
        }
        else {
            return res.status(400).send({ status: false, message: "video is required" })
        }
        const newReel = await new videoModel({
            subAdmin: req.user.adminId,
            video: video,
            caption,
        });
        await newReel.save();
        res.status(201).json({ message: 'video uploaded successfully', data : newReel });
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: err.message });
    }
}

exports.updateVideo = async (req, res) => {
    try {
        const { caption } = req.body;
        let video = req.files;

        if (video && video.length > 0) {
            video = await aws.uploadFile(video[0]);
        }
        else {
            return res.status(400).send({ status: false, message: "video is required" })
        }
        const subAdmin = req.user.adminId;
        const checkVideo = await videoModel.find({ _id: req.params.id, subAdmin: subAdmin, isDeleted: false });
        if(checkVideo){
            const updateVideo = await videoModel.findOneAndUpdate({
                _id: req.params.id,
                subAdmin: subAdmin,
                isDeleted: false
            }, {
                $set: {
                    video: video,
                    caption: caption,
                }
            }, { new: true });
           return res.status(200).json({ msg: 'Video updated successfully', data: updateVideo });
        }
        else{
            return res.status(400).json({ msg: 'Video not found' });
        }
        //res.status(200).json({ msg: 'Video updated successfully', data: updateVideo });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.message });
    }
}

exports.getAllVideos = async (req, res) => {
    try {
        const videoCount = await videoModel.find({ isDeleted: false }).count();
        const videoData = await videoModel.find({ isDeleted: false });
        return res.status(200).send({ msg: "videos fetched successfully", count: videoCount, data: videoData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.getallvideoOfOwn = async (req, res) => {
    try {
        const subAdmin = req.user.adminId;
        const videoCount = await videoModel.find({ subAdmin: subAdmin, isDeleted: false }).count();
        const videoData = await videoModel.find({ subAdmin: subAdmin, isDeleted: false });
        return res.status(200).send({ msg: "videos fetched successfully", count: videoCount, data: videoData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.deleteVideo = async (req, res) => {
 try{
    const subAdmin = req.user.adminId;
    const checkVideo = await videoModel.find({ _id: req.params.id, subAdmin: subAdmin, isDeleted: false });
    if(checkVideo){
        const deleteVideo = await videoModel.findOneAndUpdate({ _id:req.params.id,subAdmin: subAdmin,isDeleted: false},{ $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });
        return res.status(200).send({ msg: "video deleted successfully", data: deleteVideo });
    }
    else{
        return res.status(400).send({ msg: "video not found" });
    }
 }
    catch(err){
        return res.status(500).send(err.message);
    }
}