var express = require('express'),
		App = {},
		http,
		io;

App.port = 1337;
App.server = express();
App.mongoose = require('mongoose');
App.user = require('./node_modules/vidi/mongo/user');
App.formidable = require('formidable');
App.fs = require('fs');
App.util = require('util');

http = require('http').Server(App.server);
io = require('socket.io')(http);



App.mongoose.connect('mongodb://localhost/vidi', function(err) {
  if (err) { throw err; }
});

App.server.use(express.static('../'));



/*App.get('/',function(req,res){
	res.send('Hello World');
});*/


http.listen(App.port,function(){
	console.log('Listening on '+App.port);

});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.join(socket.handshake.sessionID);



  socket.on('login',function(user){
  	App.user.login(user,socket);
  });
  
	socket.on('signup',function(user){
		App.user.signup(user,socket);
	}); 

	App.server.post('/post', function(req,res){
		App.upload(req,res);
	});

});

App.upload = function(req,res){

		var form = new App.formidable.IncomingForm();

		var socket = io.sockets.in(req.sessionID);

		form.addListener('progress', function(bytesReceived, bytesExpected){
	    
	    var ratio = (bytesReceived/bytesExpected)*100;
	    socket.emit('upload-progress',Math.round(ratio));
	    if(ratio==100){
	    	console.log('upload finish');
	    }

	  });


	  form.uploadDir = __dirname + '/data/';
	  form.on('file', function(field, file) {
	     App.fs.rename(file.path, form.uploadDir + "/" + file.name);
	     console.log(form.uploadDir + "/" + file.name);
	  });

		form.parse(req, function(err, fields, files) {
	    res.writeHead(200);
	    res.end();
	  });

	  console.log(form);
}