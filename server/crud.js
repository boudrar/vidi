var App = require('./settings'),
		chalk = require('chalk'),
		crudlog = chalk.bold.magenta;
//////////////////// CRUD VIDEO

// CREATE VIDEO - express.post
App.express.post('/v', function(req,res){
  var socket = App.io.sockets.connected[req.query.sid];
  App.video.upload(req,res,__dirname,socket);
  console.log(crudlog('CRUD POST VIDEO'));
});
// READ VIDEO - express.get
App.express.get('/v/:id', function(req,res){
	console.log(crudlog('CRUD GET VIDEO',req.query.id));
});
// UPDATE VIDEO - express.put
App.express.put('/v', function(req,res){
	console.log(crudlog('CRUD UPDATE VIDEO',req.query));
});
// DELETE VIDEO - express.delete
App.express.delete('/v', function(req,res){
	console.log(crudlog('CRUD DELETE VIDEO',req.query));
});

//////////////////// CRUD USER

// CREATE USER - express.post
App.express.post('/u', function(req,res){
	console.log(crudlog('CRUD POST USER'),req.query);
});
// READ USER - express.get
App.express.get('/u', function(req,res){
	console.log(crudlog('CRUD GET USER'),req.query);
});
// UPDATE USER - express.put
App.express.put('/u', function(req,res){
	console.log(crudlog('CRUD UPDATE USER'),req.query);
});
// DELETE USER - express.delete
App.express.delete('/u', function(req,res){
	console.log(crudlog('CRUD DELETE USER'),req.query);
});

