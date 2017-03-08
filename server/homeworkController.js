var Q = require('q');
var hw = require('./HomeworkSchema.js');


var findHw = Q.nbind(hw.findOne, hw);
var findAll = Q.nbind(hw.find, hw);
var createHw = Q.nbind(hw.create, hw);
var deleteHw = Q.nbind(hw.remove, hw);
var updateHw = Q.nbind(hw.update, hw);

module.exports = {
  addAssignment: function (req, res, next) {
   var name = req.body.name;
   var date = req.body.dueDate;
   var checked = req.body.checked;
   var islate = req.body.islate;
   findHw({name: name})
     .then(function (hw) {
       if (hw) {
         res.send('Assignment already exist!');
       } else {
          createHw({
           name: name,
           dueDate: date,
           checked: checked,
           islate: islate
         })
         .then(function(){
           res.send(200);
         })

       }
     })
     .fail(function (error) {
       next(error);
     });
  },
  getAll: function (req, res, next) {
   findAll()
     .then(function (hw) {
       res.send(hw);
     })
     .catch(function (error) {
       next(error);
     });
 },
 removeAssignment: function(req, res, next) {
   var name = req.url.split('?')[1].split('&')[1].split('=')[1];
   findHw({name: name})
   .then(function(hw){
     deleteHw(hw)
     res.send(200);
     console.log('ITEM DELETED');
   })
   .catch(function(error) {
     next(error);
   })
 },
 addCheck: function(req, res, next){
   var name = req.body.name;
   var checked = req.body.checked;
   findHw({name: name})
   .then(function(hw){
     if(hw.checked === false){
       hw.checked = true;
       hw.save();
     } else if(hw.checked === true) {
       hw.checked = false;
       hw.save();
     }
     console.log('THIS IS HW', hw);
   })
 },
 isLate: function(req, res, next) {
  var currentDate = new Date();
  var name = req.body.name;
  var listDate = new Date(req.body.dueDate);
  var condition = currentDate > listDate;
  console.log('THIS IS SEVER CONDITION', condition);
  if(condition){
    findHw({name: req.body.name})
    .then(function(hw){
      hw.islate = true;
      hw.save();
    })
  }
  console.log('LOOK AT ME', req.body);


 }
}
