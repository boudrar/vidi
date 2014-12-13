var express = require('express'),
	App = express(),

	http = require('http').Server(App),
	io = require('socket.io')(http),
	async = require('async'),
	mongoose = require('mongoose'),
	//mongoose_shema = require('./js/node/mongo/shema'),
	mongoose_model = require('./js/node/mongo/model'),
	crypto = require('./js/node/crypto');
	//mongoose_inc = require('mongoose-auto-increment');

App.port = 1337;

mongoose.connect('mongodb://localhost/mewpipe', function(err) {
  if (err) { throw err; }
});

App.use(express.static('./'));

/*App.get('/',function(req,res){
	res.send('Hello World');
});*/


http.listen(App.port,function(){
	console.log('Listening on '+App.port);
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('login',function(user){
  	App.checkUser(user,socket);
  });
  
	socket.on('signup',function(user){
  	App.createUser(user,socket);
  });
  

});

App.createUser = function(User,socket){
	mongoose_model.userid.findOne({ _id: 'UserId' }, function (err, userId){
	  userId.seq++;
	  User.id = userId.seq;
	  userId.save();
	});
	 
	var user = new mongoose_model.user({ id:User.id,username : User.username,password:crypto.encrypt(User.password) });

	user.save(function (err) {
	  if (err) { 
	  	App.createUser.fail(socket,'Server fail :(');
	  	throw err; 
	  }
	  console.log(user.username + ' ajouté avec succès !');
	  App.createUser.success(socket,'Sign Up :)',user);
	  mongoose.connection.close();
	});
}
App.createUser.fail = function(socket,alert){
	console.log('createUser fail');
	socket.emit('form-alert',alert,'error');
}
App.createUser.success = function(socket,alert,user){
	console.log('createUser success');
	socket.emit('form-alert',alert,'success',user);
}


/*var UniqueId = new mongoose_model.userid({ _id : 'UserId' ,seq : 0});

UniqueId.save(function (err) {
  if (err) { throw err; }
  console.log(UniqueId._id + ' ajouté avec succès !');
  // On se déconnecte de MongoDB maintenant
  mongoose.connection.close();
});*/

/*mongoose_model.userid.find(null, function (err, userId) {
  if (err) { throw err; }

  console.log(userId);
});*/


App.checkUser = function(_user,socket){
	mongoose_model.user.findOne({username:_user.username}, function (err, user) {

	  if (err) { throw err; }

	  if(user!=undefined){

	  	if(user.password == _user.password) App.checkUser.success(socket,'Success !',user);
			else App.checkUser.fail(socket,'wrong password');

	  }else App.checkUser.fail(socket,'wrong username & password');

	});
}
App.checkUser.fail = function(socket,alert){
	console.log('check fail');
	socket.emit('form-alert',alert,'error');
}
App.checkUser.success = function(socket,alert,user){
	console.log('check success');
	socket.emit('form-alert',alert,'success',user);
}


/*mongoose_model.userid.findOne({ _id: 'UserId' }, function (err, userId){

  userId.seq++;
  userId.save();

});
*/