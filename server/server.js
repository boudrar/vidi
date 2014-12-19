var express = require('express'),
		App = {},
		http,
		io;

App.port = 1337;
App.server = express();
App.mongoose = require('mongoose');
App.user = require('./node_modules/vidi/mongo/user');
App.video = require('./node_modules/vidi/mongo/video');

App.http = require('http').Server(App.server);
App.io = require('socket.io')(App.http);

App.mongoose.connect('mongodb://localhost/vidi', function(err) {
  if (err) { console.log('mongo error : ' + err); }
});
App.server.use(express.static('../'));
App.http.listen(App.port);

////////////////////////////////////////

App.io.on('connection', function(socket){
  console.log('a user connected',socket.id);

  socket.on('userknown',function(id){
  	App.video.checkUserVideos(id,socket);
  });

  socket.on('login',function(user){
  	App.user.login(user,socket);
  });
  
	socket.on('signup',function(user){
		App.user.signup(user,socket);
	});

});

App.server.post('/post', function(req,res){
  var socket = App.io.sockets.connected[req.query.sid];
  App.video.upload(req,res,__dirname,socket);
});

