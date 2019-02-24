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

    //Send a generic message and a user-specific message
    socket.emit('newMessage', {
        from: 'Admin',
        message: 'Welcome to Node-Chat app. Enjoy!',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from:"Admin",
        message:"A new user just joined the chat",
        createdAt: new Date().getTime()
    })

    socket.on('disconnect', ()=>{
        console.log("Bye bye now");
    })

    // ReEmit the recieved message from front end
    socket.on('composeMessage', (message)=>{
        console.log("New message compose event!");

        // Send to all inc the sender
        io.emit('newMessage', {
            from : message.from,
            message : message.message,
            createdAt: new Date().getTime()
        })

        // Send to all except the sender
        // socket.broadcast.emit('newMessage',{
        //     from : message.from,
        //     message : message.message,
        //     createdAt: new Date().getTime()
        // })

    })
})



server.listen(PORT, ()=>{console.log(`Listening on PORT:${PORT}`)});


