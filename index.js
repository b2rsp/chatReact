var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 8089;
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

var userID = 0
io.on('connection', function(socket){
    console.log('a user connected');
    userID++
    var username = 'Username' + userID
    socket.emit('nick', username)
    socket.on('disconnect', function(){
      console.log('user disconnected');
      userID--
    });

    socket.on('ADD_MESSAGE', function(msg){
        socket.broadcast.emit('ADD_MESSAGE', msg)
    });

    socket.on('change nick', function(msg) {
        socket.broadcast.emit('change nick', msg)
    });

    socket.on('think message', function(msg) {
        io.emit('think message', msg)
    });

    socket.on('removing message', function(msg){
        console.log('removing message')
        socket.broadcast.emit('removing message', msg)
    });

    socket.on('fadelast​', function(msg) {
        io.emit('fadelast​')
    });

    socket.on('highlight​', function(msg){
        io.emit('highlight​', msg)
    });
    
    socket.on('countdown​', function(data){
        socket.broadcast.emit('countdown​', data)
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing')
    })
});

http.listen(port, function(){
  console.log(`listening on *:${port}`);
});
    