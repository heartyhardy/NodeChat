
const socket = io();
//Connect
socket.on('connect',()=>{
    console.log('Connected to server');

    //After connected send an email
    socket.emit('composeMessage', {
        from: "charith",
        to:"siana",
        message:"Make me a sandwich please.",
        timestamp: new Date().timestamp
    })
});
//Disconnect
socket.on('disconnect',()=>{
    console.log('Disconnected from the server');
})

socket.on('newMessage', (message)=>{
    console.log('You have a new message');
    console.log(message);
})
