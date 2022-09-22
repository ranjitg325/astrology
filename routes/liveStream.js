// const express = require("express");
// const app = express();
// const server = require("http").Server(app);
// const { v4: uuidv4 } = require("uuid");
// app.set("view engine", "ejs");
// const io = require("socket.io")(server, {
//   cors: {
//     origin: '*'
//   }
// });
// const { ExpressPeerServer } = require("peer");
// const peerServer = ExpressPeerServer(server, {
//   debug: true,
// });

// app.use("/peerjs", peerServer);
// app.use(express.static("public"));

// app.get("/video/:person", (req, res) => {
//   const video = req.params.person

//   res.redirect(`/${uuidv4()}`);
// });

// app.get("/:room", (req, res) => {
//   res.render("../view/room", { roomId: req.params.room });
// });

// io.on("connection", (socket) => {
//   socket.on("join-room", (roomId, userId, userName) => {
//     socket.join(roomId);
//     socket.to(roomId).broadcast.emit("user-connected", userId);
//     socket.on("message", (message) => {
//       io.to(roomId).emit("createMessage", message, userName);
//     });
//   });
// });

// //server.listen(process.env.PORT || 3000);
// // server.listen(process.env.PORT || 3000, function () {
// //   console.log('Express app running on port ' + (process.env.PORT || 3000))
// // });


const express = require('express');
const router = express.Router();
const liveStreamController = require('../controllers/liveStream');


router.get('/video/:person', liveStreamController.video);
router.get('/:room', liveStreamController.room);

module.exports = router;