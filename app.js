var createError = require("http-errors");
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
//var path = require("path")
var cookieParser = require("cookie-parser");
const multer = require('multer')
var logger = require("morgan");


const { default: mongoose } = require('mongoose');
const app = express();

const user = require('./routes/user.js');
const admin = require('./routes/admin.js');
const card = require('./routes/card.js');
const horoscope = require('./routes/horoscope.js');
const blog = require('./routes/blog.js');
const upcomingFestival = require('./routes/upcomingFestival.js');
const palmReader = require('./routes/palmReader.js');
const videoUpload = require('./routes/videoUpload.js');
const chatLive = require('./routes/chatLive.js');
const paymentGateway = require('./routes/paymentGateway.js');
const liveStream = require('./routes/liveStream.js');

require('dotenv').config();
// //const multer = require("multer")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())
app.use(cors());
app.use(cookieParser());
app.use(logger("dev"));

mongoose.connect("mongodb+srv://sapna20:Sapnadha20@cluster0.crepr.mongodb.net/Project-astrology-db?retryWrites=true&w=majority", {
   useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

////app.use('/', route);

app.use('/user', user);
app.use('/admin', admin);
app.use('/card', card);
app.use('/horoscope', horoscope);
app.use('/blog', blog);
app.use('/upcomingFestival', upcomingFestival);
app.use('/palmReader', palmReader);
app.use('/videoUpload', videoUpload);  //if it is not working then pls check the multer,multer-s3,aws-sdk version "aws-sdk": "^2.895.0","multer": "^1.4.2","multer-s3": "^2.9.0"(go with these version only)
app.use('/chatLive', chatLive);
app.use('/paymentGateway', paymentGateway); //comment this line and run the server from  payment gateway controller, then it will run
app.use('/liveStream', liveStream);


app.use(function (req, res, next) {
    next(createError(404));
  });

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
