var mongoose = require('mongoose');
	//mongoose_shema = require('./js/node/mongo/shema');

exports.user_shema = new mongoose.Schema({
	id : { type : Number },
  username : { type : String },
  password : { type : String }
});
exports.user = mongoose.model('user', exports.user_shema);

//////////////////////////////////////////////

exports.id_shema = new mongoose.Schema({
  _id : { type : String }, 
  seq : { type : Number } //64-bit Integer = 18
});
exports.userid = mongoose.model('userid', exports.id_shema);





