const path = require('path');
const http = require('http');
const express = require('express');
const {isRealString} = require('./utils/validation')

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {


    socket.on('join', (params, callback ) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Username and room name are required');
        }
        socket.join(params.room);
        
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('User', `${coords.latitude}`, `${coords.longitude}`))
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
}); 