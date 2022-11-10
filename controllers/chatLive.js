// const express = require('express')
// const app = express()
// const http = require('http').createServer(app)

// //app.use(express.static(__dirname + '/public'))
// app.use(express.static(__dirname + '/indexForChat.html'))

// exports.chat=app.get('/chat/:person', (req, res) => {
//     const person = req.params.person
    
//     res.sendFile(__dirname + '/indexForChat.html')
// })

// // Socket 
// const io = require('socket.io')(http)

// io.on('connection', (socket) => {
//     console.log('Connected...')
//     socket.on('message', (msg) => {
//         socket.broadcast.emit('message', msg)
//     })

// })