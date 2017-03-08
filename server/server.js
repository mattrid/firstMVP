var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/whatsDue');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

var bodyParser = require('body-parser');
var hwController = require('./homeworkController.js')
var app = express();
app.use(bodyParser.json());
app.post('/api/addAssignment', hwController.addAssignment);
app.get('/api/getAll', hwController.getAll);
app.delete('/api/removeAssignment', hwController.removeAssignment);
app.put('/api/addCheck', hwController.addCheck);
app.put('/api/isLate', hwController.isLate);
app.use(express.static('public'))

app.listen(8000);

module.exports = app;
