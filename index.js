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
        let data = {
            message: msg,
            sent: false
        }
        socket.broadcast.emit('ADD_MESSAGE', data)
    });

    socket.on('CHANGE_NICK', function(nick) {
        socket.broadcast.emit('CHANGE_NICK', nick)
    });

    socket.on('THINK', function(msg) {
        let data = {
            message: msg,
            sent: false,
            meta: ['think']
        };
        socket.broadcast.emit('THINK', data);
    });

    socket.on('REMOVE_LAST_MESSAGE', function(msg){
        io.emit('REMOVE_LAST_MESSAGE');
    });

    socket.on('FADELAST', function(msg) {
        io.emit('FADELAST')
    });

    socket.on('HIGHLIGHT', function(msg){
        let data = {
            message: msg,
            sent: false,
            meta: ['highlight']
        }
        socket.broadcast.emit('HIGHLIGHT', data)
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
    