const cardModel = require("../models/cardModel");
const adminModel = require("../models/adminModel")
const aws = require("../aws/aws");

exports.cardCreate = async (req, res) => {
    try{
        let {
            zodiacName,
            //zodiacImage,
            cardType,
            predictionTypeAndDescription,
    } = req.body;
    let zodiacImage = req.files;

    if(!zodiacName || !cardType || !predictionTypeAndDescription){
        return res.status(400).json({message:"All fields are required"});
    }
    if(req.files && req.files.length > 0){
        zodiacImage = await Promise.all(
            req.files.map(async (file) => {
                return await aws.uploadToS3(file.buffer);
            })
        );
    }
    const newCard = new cardModel({
        zodiacName,
        zodiacImage,
        cardType,
        predictionTypeAndDescription,
        subAdmin:req.user.adminId
    });
    const cardData = await newCard.save();
    return res.status(201).send({message:"card created successfully",data:cardData});
    }catch(err){
        return res.status(500).send(err.message);
    }
}


// exports.cardCreate = async (req, res) => {
//     try {
//         if (req.files && req.files.length > 0) {
//             let {
//                 //subAdmin,
//                 cardName,
//                 //cardImage,
//                 cardDescription,
//                 cardType,
//                 cardPrediction
//             } = req.body;
//             if (!cardName || !cardDescription || !cardType || !cardPrediction) {
//                 return res.status(400).json({ message: "All fields are required" });
//             }

//             //if(req.files && req.files.length > 0){
//             cardImage = await Promise.all(
//                 req.files.map(async (file) => {
//                     return await aws.uploadToS3(file.buffer);
//                 })
//             );
//             //}
//             const newCard = new cardModel({
//                 subAdmin: req.user.adminId,
//                 cardName,
//                 cardImage,
//                 cardDescription,
//                 cardType,
//                 cardPrediction
//             });
//             const cardData = await newCard.save();
//             return res.status(200).send({ msg: "card created successfully", data: cardData });
//         }
//         else {
//             let {
//                 cardName,
//                 cardDescription,
//                 cardType,
//                 cardPrediction
//             } = req.body;
//             if (!cardName || !cardDescription || !cardType || !cardPrediction) {
//                 return res.status(400).json({ message: "All fields are required" });
//             }
//             const newCard = new cardModel({
//                 subAdmin: req.user.adminId,
//                 cardName,
//                 //cardImage,
//                 cardDescription,
//                 cardType,
//                 cardPrediction
//             });
//             const cardData = await newCard.save();
//             return res.status(200).send({ msg: "card created successfully", data: cardData });
//         }
//     }
//     catch (err) {
//         return res.status(500).send(err.message);
//     }
// }


exports.getCardByType = async (req, res) => {
    try {
        const cardType = req.body.cardType;
        const cardData = await cardModel.find({ cardType: cardType, isDeleted: false });
        if (!cardData) {
            return res.status(400).send({ msg: "No card found" });
        }
        return res.status(200).send({ data: cardData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
exports.getAllCardsOfOwn = async (req, res) => {
    try {
        const subAdmin = req.user.adminId;
        const cardCount = await cardModel.find({ subAdmin: subAdmin, isDeleted: false }).count();
        const cardData = await cardModel.find({ subAdmin: subAdmin, isDeleted: false });
        return res.status(200).send({ msg: "cards fetched successfully", count: cardCount, data: cardData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
exports.getAllCards = async (req, res) => {
    try {
        const cardCount = await cardModel.find({ isDeleted: false }).count();
        const cardData = await cardModel.find({ isDeleted: false });
        return res.status(200).send({ msg: "cards fetched successfully", count: cardCount, data: cardData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

// exports.getCardById = async (req, res) => {
//     try {
//         const cardId = req.body.cardId;
//         const cardData = await cardModel.findById(cardId);
//         return res.status(200).send({ data: cardData });
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// };

//update card wothout changing image and old data will be there
exports.updateCard = async (req, res) => {
    try {
        let {
            cardName,
            cardDescription,
            cardType,
            cardPrediction
        } = req.body;
        let cardImage = req.files;

        if (req.files && req.files.length > 0) {
            cardImage = await Promise.all(
                req.files.map(async (file) => {
                    return await aws.uploadToS3(file.buffer);
                })
            );
        }
        const subAdmin = req.user.adminId;
        const updatedCard = await cardModel.findOneAndUpdate(
            { _id: req.params.id , subAdmin: subAdmin}, //card id
            { $set: { cardName, cardImage, cardDescription, cardType, cardPrediction } },
            { new: true });
            if (!updatedCard) {
                return res.status(400).send({ msg: "No card found" });
            }
            return res.status(200).send({ msg: "card updated successfully", data: updatedCard });
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}


//subAdmin can delete his own card only
exports.deleteCard = async (req, res) => {
    try {
        const subAdmin = req.user.adminId;
        const checkCard = await cardModel.find({ _id: req.params.id, subAdmin: subAdmin, isDeleted: false });
        if (checkCard) {
            const user = await cardModel.findOneAndUpdate({ _id: req.params.id, subAdmin: subAdmin, isDeleted: false }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });
            res.status(200).send({ msg: "card deleted successfully", data: user });
        } else {
            res.status(400).send({ error: 'card not found' });
        }
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}