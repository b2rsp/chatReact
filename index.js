var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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

    socket.on('message', function(msg){
        io.emit('message', msg);
    });

    socket.on('change nick', function(msg) {
        console.log('msg ', msg);
        socket.broadcast.emit('change nick', msg)
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    