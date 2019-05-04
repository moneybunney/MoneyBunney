var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  Name: { type: String, required: true },
  Icon: { type: String, required: true },
  _id: { type: String, required: true },
});

module.exports = mongoose.model('Category', schema);
