const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
app.set("view engine", "ejs");
const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);
app.use(express.static('publicForLiveStream'));

exports.video=app.get("/video/:person", (req, res) => {
  const video = req.params.person

  res.redirect(`/${uuidv4()}`);
});

exports.room=app.get("/:room", (req, res) => {
  res.render("../viewForLiveStream/room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName);
    });
  });
});

//server.listen(process.env.PORT || 3000);
// server.listen(process.env.PORT || 3000, function () {
//   console.log('Express app running on port ' + (process.env.PORT || 3000))
// });
