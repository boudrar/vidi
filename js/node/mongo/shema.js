
var mongoose = require('mongoose');

exports.user = new mongoose.Schema({
  pseudo : { type : String, match: /^[a-zA-Z0-9-_]+$/ }
});

