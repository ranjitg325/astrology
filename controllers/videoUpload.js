require("dotenv").config()
const express = require('express')
const app = express();

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,

});
const BUCKET = process.env.BUCKET
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        //acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname)
        }
    })
})

//upload.array("file")
exports.upload=app.post('/upload', upload.single('file'), async function (req, res, next) {
    try {
    res.status(201).send('Successfully uploaded ' + req.file.location + ' location!')
    } catch (error) {
        console.log(error);
    }
})

exports.list=app.get("/list", async (req, res) => {
    try {
    let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    let x = r.Contents.map(item => item.Key);
    return res.status(200).send(x)
    } catch (error) {
        console.log(error);
    }
})


exports.download=app.get("/download/:filename", async (req, res) => {
    try{
    const filename = req.params.filename
    let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    res.status(200).send(x.Body)
    }
    catch(err){
        console.log(err)
    }
})

exports.delete=app.delete("/delete/:filename", async (req, res) => {
    try{
    const filename = req.params.filename
    await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    return res.status(200).send("File Deleted Successfully")
    }
    catch(err){
        return res.send(err)
    }
})