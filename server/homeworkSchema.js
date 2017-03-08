var mongoose = require('mongoose');

var HomeworkSchema = new mongoose.Schema({
  name: String,
  dueDate: String,
  checked: Boolean,
  islate: Boolean
});

module.exports = mongoose.model('Homework', HomeworkSchema);
