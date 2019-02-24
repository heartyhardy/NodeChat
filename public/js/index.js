
const socket = io();
//Connect
socket.on('connect',()=>{
    console.log('Connected to server');
});
//Disconnect
socket.on('disconnect',()=>{
    console.log('Disconnected from the server');
})

socket.on('newMessage', (message)=>{
    console.log('You have a new message');
    console.log(message);
})
