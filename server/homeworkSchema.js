var mongoose = require('mongoose');

var HomeworkSchema = new mongoose.Schema({
  name: String,
  dueDate: String
});

module.exports = mongoose.model('Homework', HomeworkSchema);
