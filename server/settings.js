////////////////////////////
//Server dependencies
var mongoose = require('mongoose'),
	  express = require('express'),
	  chalk = require('chalk');

exports.express = express();
exports.user = require('./node_modules/vidi/mongo/user');
exports.video = require('./node_modules/vidi/mongo/video');


////////////////////////////
//Server variables
var port = 1337;
exports.port = process.env.PORT || port;
exports.env = ((exports.port==port) ? 'dev' : 'prod');
var db = ((exports.env=='prod') ? 'mongodb://nikopol:4815162342@proximus.modulusmongo.net:27017/qosy2Rum' : 'mongodb://localhost/vidi');


////////////////////////////
//server protocols
exports.express.use('/app',express.static('../app/'));
exports.express.use('/server/data',express.static('data/'));
var server = exports.express.listen(exports.port);
exports.io = require('socket.io')(server); //Socket.Io


////////////////////////////
//Server database connection
mongoose.connect(db, function(err) {
  if (err) { console.log(error('MONGO ERROR',err)); }
  else console.log(success('MONGO CONNECTED',db));
});

////////////////////////////
//Custom app log

var success = chalk.bold.green;
var error = chalk.bold.red;

// APP INIT LOG
console.log(success('SERVER.PORT =',exports.port,'|','SERVER.ENV =',exports.env));
// LOG UNCAUGHT EXCEPTION
process.on('uncaughtException', function(err) {
  console.log(error('Caught exception: ' + err.stack));
});
