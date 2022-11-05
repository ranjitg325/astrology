const cardModel = require("../models/cardModel");
const adminModel= require("../models/adminModel")
const aws = require("../aws/aws");


exports.cardCreate = async (req, res) => {
    try {
        if(req.files && req.files.length > 0){
        let {
            subAdmin,
            cardName,
            //cardImage,
            cardDescription,
            cardType,
            cardPrediction
        } = req.body;
        if(!subAdmin || !cardName || !cardDescription || !cardType || !cardPrediction){
            return res.status(400).json({ message: "All fields are required" });
        }
        
        //if(req.files && req.files.length > 0){
            cardImage = await Promise.all(
              req.files.map(async (file) => {
                return await aws.uploadToS3(file.buffer);
              })
            );
          //}

        let cardRequest = {
            subAdmin,
            cardName,
            cardImage,
            cardDescription,
            cardType,
            cardPrediction
        };
        const cardData = await cardModel.create(cardRequest);
        return res.status(200).send({ msg: "card created successfully", data: cardData });
    }
    else{
        let {
            subAdmin,
            cardName,
            cardDescription,
            cardType,
            cardPrediction
        } = req.body;
        if(!subAdmin || !cardName || !cardDescription || !cardType || !cardPrediction){
            return res.status(400).json({ message: "All fields are required" });
        }
        
        let cardRequest = {
            subAdmin,
            cardName,           
            cardDescription,
            cardType,
            cardPrediction
        };
        const cardData = await cardModel.create(cardRequest);
        return res.status(200).send({ msg: "card created successfully", data: cardData });
    }
    }
     catch (err) {
        return res.status(500).send(err.message);
    }
}


exports.getAllCards = async (req, res) => {
    try {
        // const adminId = req.user.userId;
        // const adminData = await adminModel.findOne({ _id: adminId });
        // if (!adminData) {
        //   return res.status(401).send({ message: "You are not authorized" });
        // }

        ////const subAdmin = req.body.subAdmin;
        const cardCount = await cardModel.find({/*subAdmin:subAdmin,*/ isDeleted: false }).count();
        const cardData = await cardModel.find({/* subAdmin : subAdmin,*/isDeleted: false });
        return res.status(200).send({ msg: "cards fetched successfully", count: cardCount, data: cardData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.getCardById = async (req, res) => {
    try {
        const cardId = req.body.cardId;
        const cardData = await cardModel.findById(cardId);
        return res.status(200).send({ data: cardData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.updateCard = async (req, res) => {
    try {
        const cardId = req.body.cardId;
        const {
            subAdmin,
            cardName,
            cardImage,
            cardDescription,
            todaysCard,
            weeklyCard,
            monthlyCard,
            yearlyCard
        } = req.body;
        const cardRequest = {
            subAdmin,
            cardName,
            cardImage,
            cardDescription,
            todaysCard,
            weeklyCard,
            monthlyCard,
            yearlyCard
        };
        const updatedData = await cardModel.findOneAndUpdate(
            { _id: cardId, isDeleted: false },
            cardRequest,
            { new: true }
        );
        return res
            .status(200)
            .send({ message: "card updated successfully", data: updatedData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.deleteCard = async (req, res) => {
    try {
        const cardId = req.body.cardId;
        const checkCard = await cardModel.find({ _id: cardId, isDeleted: false });
        if (checkCard) {
            const user = await cardModel.updateOne({ _id: cardId, isDeleted: false }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });
            res.status(200).send({ msg: "card deleted successfully", data: user });
        } else {
            res.status(400).send({ error: 'card not found' });
        }
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
};

