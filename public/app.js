var app = angular.module('whatsDue', []);



app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
  $scope.test = 'Hello world!';
  $scope.homeworks = null;
  $scope.getAll = function(){
   $http({
     method: 'GET',
     url: '/api/getAll'
   })
   .then(function (resp) {
     console.log("THIS IS THE RESP", resp)
      $scope.homeworks = resp.data;
   })
   .catch(function(err){
     console.log('GOT THIS ERROR', err);
   });
  }
  $scope.getAll();
  $scope.addAssignment = function() {
    if($scope.name === '' || $scope.date === ''){
      return;
    } else{

      $http({
        method: 'POST',
        url: '/api/addAssignment',
        data: {name: $scope.name, dueDate: $scope.date, checked: false, islate: false}
      })
      .then(function(resp){
        console.log('THIS IS IN APP', resp.config.data)
        $scope.isLate(resp.config.data);
        $scope.getAll();
      })
      $scope.name = '';
      $scope.date = '';
    }
  }

  $scope.removeAssignment = function(index){
    var removedAssignment = $scope.homeworks.splice(index, 1);
    $http.delete('/api/removeAssignment', {params: {name: removedAssignment[0].name, dueDate: removedAssignment[0].dueDate}});
  };
  $scope.addCheck = function(homework) {
    $http.put('/api/addCheck', homework);
  }
  $scope.isLate = function(homework) {
   $http.put('/api/isLate', homework);
 }
}]);
