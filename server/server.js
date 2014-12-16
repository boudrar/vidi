var express = require('express'),
		App = {},
		http,
		io;

App.port = 1337;
App.server = express();
App.mongoose = require('mongoose');
App.user = require('./node_modules/vidi/mongo/user');
App.video = require('./node_modules/vidi/mongo/video');

http = require('http').Server(App.server);
io = require('socket.io')(http);

App.mongoose.connect('mongodb://localhost/vidi', function(err) {
  if (err) { console.log('mongo error : ' + err); }
});
App.server.use(express.static('../'));
http.listen(App.port);

////////////////////////////////////////

io.on('connection', function(socket){
  console.log('a user connected');

  socket.join(socket.handshake.sessionID);



  socket.on('userknown',function(id){
  	console.log(id);
  	App.user.id=id;
  	App.video.check(id,socket);
  });

  socket.on('login',function(user){
  	App.user.login(user,socket);
  });
  
	socket.on('signup',function(user){
		App.user.signup(user,socket);
	}); 

	App.server.post('/post', function(req,res){
		console.log('USER ID : ' + App.user.id);
		App.video.upload(req,res,io,__dirname,App.user.id);
	});

});

