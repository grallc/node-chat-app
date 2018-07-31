var socket = io();

socket.on('connect', function (){
    console.log('Connected to Server');

    socket.emit('createMessage', {
        to: 'corentin.grall@gmail.com',
        text: 'Hey, this is Corentin'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});


socket.on('newMessage', function (message) {
    console.log('Received new Message', message);
});