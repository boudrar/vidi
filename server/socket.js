var App = require('./settings'),
    chalk = require('chalk'),
    userlog = chalk.bold.white;

App.io.on('connection', function(socket){
  console.log(userlog('USER CONNECTED',socket.id));

  socket.on('userknown',function(id){
  	App.video.checkUserVideos(id,socket);
  });

  socket.on('userunknown',function(){
    socket.emit('offline-user');
  });

  socket.on('login',function(user){
  	App.user.login(user,socket);
  });
  
	socket.on('signup',function(user){
		App.user.signup(user,socket);
	});

});