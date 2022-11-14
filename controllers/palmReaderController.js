const palmReaderModel = require("../models/palmReaderModel");
const jyotisModel = require("../models/jyotisModel");
const aws = require("../aws/awsForVideo");

exports.palmReaderCreate = async (req, res) => {
    try {
        let {
            //jyotish,
            heartLineReading,
            headLineReading,
            lifeLineReading,
            fateLineReading,
            marriageLineReading,
            finalResult
        } = req.body;
        let DesignOfLineImage = req.files;
        
        if (DesignOfLineImage && DesignOfLineImage.length > 0) {
            DesignOfLineImage = await aws.uploadFile(DesignOfLineImage[0]);
        }
        else {
            return res.status(400).send({ status: false, message: "DesignOfLineImage is required" })
        }
       
        const newPalmReader = new palmReaderModel({
            //jyotish:req.user.userId,
            heartLineReading,
            headLineReading,
            lifeLineReading,
            fateLineReading,
            marriageLineReading,
            DesignOfLineImage,
            finalResult
        });
        const palmReaderData = await newPalmReader.save();
        return res.status(201).send({ message: "palmReader created successfully", data: palmReaderData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.getAllPalmReaders = async (req, res) => {
    try {
        const palmReaderCount = await palmReaderModel.find({ isDeleted: false }).count();
        const palmReaderData = await palmReaderModel.find({isDeleted: false });
        return res.status(200).send({ msg: "palmReaders fetched successfully", count: palmReaderCount, data: palmReaderData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.getAllPalmReadOfOwn = async (req, res) => {
    try {
        const jyotish = req.user.userId;
        const palmReaderCount = await palmReaderModel.find({ jyotish: jyotish, isDeleted: false }).count();
        const palmReaderData = await palmReaderModel.find({ jyotish: jyotish, isDeleted: false });
        return res.status(200).send({ msg: "palmReaders fetched successfully", count: palmReaderCount, data: palmReaderData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

// exports.getPalmReaderById = async (req, res) => {
//     try {
//         const palmReaderId = req.body.palmReaderId;
//         const palmReaderData = await palmReaderModel.findOne({ _id: palmReaderId });
//         return res.status(200).send({ msg: "palmReader fetched successfully", data: palmReaderData });
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// };

exports.updatePalmReaderById = async (req, res) => {
    try {
        const palmReaderId = req.params.id;
        let {
            heartLineReading,
            headLineReading,
            lifeLineReading,
            fateLineReading,
            marriageLineReading,
            finalResult
        } = req.body;
        let DesignOfLineImage = req.files;

        if (DesignOfLineImage && DesignOfLineImage.length > 0) {
            DesignOfLineImage = await aws.uploadFile(DesignOfLineImage[0]);
        }
        else {
            return res.status(400).send({ status: false, message: "DesignOfLineImage is required" })
        }
        const palmReaderData = await palmReaderModel.findOneAndUpdate({ _id: palmReaderId,isDeleted:false }, {
            heartLineReading,
            headLineReading,
            lifeLineReading,
            fateLineReading,
            marriageLineReading,
            DesignOfLineImage,
            finalResult
        }, { new: true });
        if (!palmReaderData) {
            return res.status(400).send({ msg: "palm id not found" });
        }
        return res.status(200).send({ msg: "palmReader updated successfully", data: palmReaderData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
exports.deletePalmReaderById = async (req, res) => {
    try {
    const checkPalm = await palmReaderModel.findOne({ _id: req.params.id, isDeleted: false });
    if (checkPalm) {
        const palmReaderData = await palmReaderModel.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });
        return res.status(200).send({ msg: "palmReader deleted successfully", data: palmReaderData });
    }
    else {
        return res.status(400).send({ msg: "palmReader id not found" });
    }
} catch (err) {
    return res.status(500).send(err.message);
}
}