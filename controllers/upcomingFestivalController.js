const upcomingFestivalModel = require("../models/upcomingFestivalModel");
const adminModel= require("../models/adminModel")

exports.upcomingFestivalCreate = async (req, res) => {
    try {
        // const adminId = req.user.userId;
        // const adminData = await adminModel.findOne({ _id: adminId });
        // if (!adminData) {
        //   return res.status(401).send({ message: "You are not authorized" });
        // }
      
        let {
            subAdmin,
            festivalName,
            festivalImage,
            festivalDescription,
            festivalDate,
            festivalTime,
            festivalLocation
        } = req.body;

        const upcomingFestivalRequest = {
            subAdmin,
            festivalName,
            festivalImage,
            festivalDescription,
            festivalDate,
            festivalTime,
            festivalLocation
        };
        const upcomingFestivalData = await upcomingFestivalModel.create(upcomingFestivalRequest);
        return res
            .status(201)
            .send({ message: "upcomingFestival created successfully", data: upcomingFestivalData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.getAllUpcomingFestivals = async (req, res) => {
    try {
        // const adminId = req.user.userId;
        // const adminData = await adminModel.findOne({ _id: adminId });
        // if (!adminData) {
        //   return res.status(401).send({ message: "You are not authorized" });
        // }
        //const subAdmin = req.body.subAdmin;
        const upcomingFestivalCount = await upcomingFestivalModel.find({/*subAdmin:subAdmin,*/ isDeleted: false }).count();
        const upcomingFestivalData = await upcomingFestivalModel.find({/* subAdmin : subAdmin,*/isDeleted: false });
        return res.status(200).send({ msg: "upcomingFestivals fetched successfully", count: upcomingFestivalCount, data: upcomingFestivalData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.getUpcomingFestivalById = async (req, res) => {
    try {
        const upcomingFestivalId = req.body.upcomingFestivalId;
        const upcomingFestivalData = await upcomingFestivalModel.findOne({ _id: upcomingFestivalId });
        return res.status(200).send({ msg: "upcomingFestival fetched successfully", data: upcomingFestivalData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.updateUpcomingFestival = async (req, res) => {
    try {
        // const adminId = req.user.userId;
        // const adminData = await adminModel.findOne({ _id: adminId });
        // if (!adminData) {
        //   return res.status(401).send({ message: "You are not authorized" });
        // }
      
        const upcomingFestivalId = req.body.upcomingFestivalId;
        let {
            subAdmin,
            festivalName,
            festivalImage,
            festivalDescription,
            festivalDate,
            festivalTime,
            festivalLocation
        } = req.body;

        const upcomingFestivalRequest = {
            subAdmin,
            festivalName,
            festivalImage,
            festivalDescription,
            festivalDate,
            festivalTime,
            festivalLocation
        };
        const upcomingFestivalData = await upcomingFestivalModel.findOneAndUpdate({ _id: upcomingFestivalId,isDeleted:false }, upcomingFestivalRequest, { new: true });
        return res.status(200).send({ msg: "upcomingFestival updated successfully", data: upcomingFestivalData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.deleteUpcomingFestival = async (req, res) => {
    try {
        // const adminId = req.user.userId;
        // const adminData = await adminModel.findOne({ _id: adminId });
        // if (!adminData) {
        //   return res.status(401).send({ message: "You are not authorized" });
        // }
      
        const upcomingFestivalId = req.body.upcomingFestivalId;
        const upcomingFestivalData = await upcomingFestivalModel.findOneAndUpdate({ _id: upcomingFestivalId,isDeleted:false }, { isDeleted: true, deletedAt: new Date() }, { new: true });
        return res.status(200).send({ msg: "upcomingFestival deleted successfully", data: upcomingFestivalData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

