var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// 

// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//       console.log('message: ' + msg);
//     });
//   });

// io.on('connection', function(socket){

//     setTimeout(function() {
//         socket.broadcast.emit('hi');
//      }, 4000);
   
//   });
//   io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//       io.emit('chat message', msg);
//     });
//   });  
// Number of clients connected
// var clients = 0;
// io.on('connection', function(socket) {

//     clients++;
//    io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
//    socket.on('disconnect', function () {
//       clients--;
//       io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
//    });
// });
//
// var clients = 0;
// io.on('connection', function(socket) {
//    clients++;
//    socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
//    socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
//    socket.on('disconnect', function () {
//       clients--;
//       socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
//    });
// });

users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
      console.log(data);
      
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
    