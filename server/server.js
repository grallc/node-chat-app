const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // On Join, many things to do
  socket.on('join', (params, callback) => {
    // Check given params
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    // Room name is case insensitive 
    params.room = params.room.toLowerCase();


    // Kick the user if the username is already in use in the room
    if(users.isUserOnline(params.name.toLowerCase(), params.room)){
      return callback('This username is already in use in this room !');
    }

    // Connect user to the room
    socket.join(params.room);


    // Remove it if it already exists
    users.removeUser(socket.id);

    // Create the user
    users.addUser(socket.id, params.name, params.room);

    // Update users list
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    console.log(io.sockets.adapter.rooms[params.room].sockets);


    // Send a welcome message
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  // On Message, should send a message
  socket.on('createMessage', (message, callback) => {

    var user = users.getUser(socket.id);


    if(user && isRealString(message.text)) {
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  // On Location Message, should send a location message containing a link
  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  // On Disconnect, should remove the users of the lists
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

// Start the server on the given port
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
