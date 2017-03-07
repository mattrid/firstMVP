var Q = require('q');
var hw = require('./HomeworkSchema.js');


var findHw = Q.nbind(hw.findOne, hw);
var findAll = Q.nbind(hw.find, hw);
var createHw = Q.nbind(hw.create, hw);

module.exports = {
  addAssignment: function (req, res, next) {
   var name = req.body.name;
   var date = req.body.date;
   console.log(req.body);
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
       console.log('GET ALL HAPPENED')
       console.log('THIS IS THE RES', hw[0].name);
       res.send(hw);
     })
     .catch(function (error) {
       next(error);
     });
 }
}
