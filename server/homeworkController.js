var Q = require('q');
var hw = require('./HomeworkSchema.js');


var findHw = Q.nbind(hw.findOne, hw);
var findAll = Q.nbind(hw.find, hw);
var createHw = Q.nbind(hw.create, hw);
var deleteHw = Q.nbind(hw.remove, hw);

module.exports = {
  addAssignment: function (req, res, next) {
   var name = req.body.name;
   var date = req.body.dueDate;
   findHw({name: name})
     .then(function (hw) {
       if (hw) {
         res.send('Assignment already exist!');
       } else {
          createHw({
           name: name,
           dueDate: date
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
 }
}
