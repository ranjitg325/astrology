const palmReaderModel = require("../models/palmReaderModel");
const adminModel= require("../models/adminModel")

exports.palmReaderCreate = async (req, res) => {    
    try {
        // const adminId = req.user.userId;
        // const adminData = await adminModel.findOne({ _id: adminId });
        // if (!adminData) {
        //   return res.status(401).send({ message: "You are not authorized" });
        // }
      
        let {
            subAdmin,
            heartLineReading,
            headLineReading,
            lifeLineReading,
            fateLineReading,
            marriageLineReading
        } = req.body;

        const palmReaderRequest = {
            subAdmin,
            heartLineReading,
            headLineReading,
            lifeLineReading,
            fateLineReading,
            marriageLineReading
        };
        const palmReaderData = await palmReaderModel.create(palmReaderRequest);
        return res
            .status(201)
            .send({ message: "palmReader created successfully", data: palmReaderData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.getAllPalmReaders = async (req, res) => {
    try {
        // const adminId = req.user.userId;
        // const adminData = await adminModel.findOne({ _id: adminId });
        // if (!adminData) {
        //   return res.status(401).send({ message: "You are not authorized" });
        // }
        //const subAdmin = req.body.subAdmin;
        const palmReaderCount = await palmReaderModel.find({/*subAdmin:subAdmin,*/ isDeleted: false }).count();
        const palmReaderData = await palmReaderModel.find({/* subAdmin : subAdmin,*/isDeleted: false });
        return res.status(200).send({ msg: "palmReaders fetched successfully", count: palmReaderCount, data: palmReaderData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.getPalmReaderById = async (req, res) => {
    try {
        const palmReaderId = req.body.palmReaderId;
        const palmReaderData = await palmReaderModel.findOne({ _id: palmReaderId });
        return res.status(200).send({ msg: "palmReader fetched successfully", data: palmReaderData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.updatePalmReaderById = async (req, res) => {
    try {
        const palmReaderId = req.body.palmReaderId;
        let {
            subAdmin,
            heartLineReading,
            headLineReading,
            lifeLineReading,
            fateLineReading,
            marriageLineReading
        } = req.body;

        const palmReaderRequest = {
            subAdmin,
            heartLineReading,
            headLineReading,
            lifeLineReading,
            fateLineReading,
            marriageLineReading
        };
        const palmReaderData = await palmReaderModel.findOneAndUpdate({ _id: palmReaderId,isDeleted:false }, palmReaderRequest, { new: true });
        return res.status(200).send({ msg: "palmReader updated successfully", data: palmReaderData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.deletePalmReaderById = async (req, res) => {
    try {
        // const adminId = req.user.userId;
        // const adminData = await adminModel.findOne({ _id: adminId });
        // if (!adminData) {
        //   return res.status(401).send({ message: "You are not authorized" });
        // }
        const palmReaderId = req.body.palmReaderId;
        const palmReaderData = await palmReaderModel.findOneAndUpdate({ _id: palmReaderId,isDeleted:false }, { isDeleted: true, deletedAt: new Date() }, { new: true });
        return res.status(200).send({ msg: "palmReader deleted successfully", data: palmReaderData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}