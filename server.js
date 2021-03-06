var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 8089;
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

var userID = 0
io.on('connection', function(socket){
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
    
    socket.on('COUNTDOWN', function(data){
        socket.broadcast.emit('COUNTDOWN', data)
    });
    
    socket.on('TYPING', function(data) {
        socket.broadcast.emit('TYPING')
    })
});

http.listen(port, function(){
  console.log(`listening on *:${port}`);
});
    