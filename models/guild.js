var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var author = new Schema({
  blacklist     : Array
});

module.exports = mongoose.model('guilds', author);