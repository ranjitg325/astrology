const horoscopeModel = require("../models/horoscopeModel");
const adminModel= require("../models/adminModel")

exports.horoscopeCreate = async (req, res) => {
    try {
        const adminId = req.user.userId;
        const adminData = await adminModel.findOne({ _id: adminId });
        if (!adminData) {
          return res.status(401).send({ message: "You are not authorized" });
        }
      
        let {
            subAdmin,
            zodiacName,
            zodiacImage,
            zodiacDescription,
            todaysHoroscope,
            weeklyHoroscope,
            monthlyHoroscope,
            yearlyHoroscope
        } = req.body;

        const horoscopeRequest = {
            subAdmin,
            zodiacName,
            zodiacImage,
            zodiacDescription,
            todaysHoroscope,
            weeklyHoroscope,
            monthlyHoroscope,
            yearlyHoroscope
        };
        const horoscopeData = await horoscopeModel.create(horoscopeRequest);
        return res
            .status(201)
            .send({ message: "horoscope created successfully", data: horoscopeData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.getAllHoroscopes = async (req, res) => {
    try {
        const adminId = req.user.userId;
        const adminData = await adminModel.findOne({ _id: adminId });
        if (!adminData) {
          return res.status(401).send({ message: "You are not authorized" });
        }
        //const subAdmin = req.body.subAdmin;
        const horoscopeCount = await horoscopeModel.find({/*subAdmin:subAdmin,*/ isDeleted: false }).count();
        const horoscopeData = await horoscopeModel.find({/* subAdmin : subAdmin,*/isDeleted: false });
        return res.status(200).send({ msg: "horoscopes fetched successfully", count: horoscopeCount, data: horoscopeData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.getHoroscopeById = async (req, res) => {
    try {
        const horoscopeId = req.body.horoscopeId;
        const horoscopeData = await horoscopeModel.findOne({ _id: horoscopeId });
        return res.status(200).send({ msg: "horoscope fetched successfully", data: horoscopeData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.updateHoroscope = async (req, res) => {
    try {
        const adminId = req.user.userId;
        const adminData = await adminModel.findOne({ _id: adminId });
        if (!adminData) {
          return res.status(401).send({ message: "You are not authorized" });
        }
        const horoscopeId = req.body.horoscopeId;
        let {
            subAdmin,
            zodiacName,
            zodiacImage,
            zodiacDescription,
            todaysHoroscope,
            weeklyHoroscope,
            monthlyHoroscope,
            yearlyHoroscope
        } = req.body;

        const horoscopeRequest = {
            subAdmin,
            zodiacName,
            zodiacImage,
            zodiacDescription,
            todaysHoroscope,
            weeklyHoroscope,
            monthlyHoroscope,
            yearlyHoroscope
        };
        const horoscopeData = await horoscopeModel.findOneAndUpdate({ _id: horoscopeId,isDeleted:false }, horoscopeRequest, { new: true });
        return res.status(200).send({ msg: "horoscope updated successfully", data: horoscopeData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.deleteHoroscope = async (req, res) => {
    try {
        const adminId = req.user.userId;
        const adminData = await adminModel.findOne({ _id: adminId });
        if (!adminData) {
          return res.status(401).send({ message: "You are not authorized" });
        }
        const horoscopeId = req.body.horoscopeId;
        const checkCard = await horoscopeModel.find({ _id: horoscopeId, isDeleted: false });
        if (checkCard) {
            const user = await horoscopeModel.updateOne({ _id: horoscopeId, isDeleted: false }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });
            res.status(200).send({ msg: "horoscope deleted successfully", data: user });
        } else {
            res.status(400).send({ error: 'horoscope not found' });
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

