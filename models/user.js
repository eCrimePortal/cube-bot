var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var author = new Schema({
  name            : String,
  id              : { type: String, unique: true },
  infractions     : Array,
  
});

module.exports = mongoose.model('discordusers', author);