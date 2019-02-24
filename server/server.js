const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const pub_path  = path.join(__dirname, '../public');

app.use(express.static(pub_path));

const PORT = process.env.PORT || 3000;

io.on('connection', (socket)=>{
    console.log("Hi there!");

    socket.on('disconnect', ()=>{
        console.log("Bye bye now");
    })

    // ReEmit the recieved message from front end
    socket.on('composeMessage', (message)=>{
        console.log("New message compose event!");
        io.emit('newMessage', {
            from : message.from,
            message : message.message,
            createdAt: new Date().getTime()
        })
    })
})



server.listen(PORT, ()=>{console.log(`Listening on PORT:${PORT}`)});


