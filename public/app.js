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
  $scope.addAssignment = function() {

    $http({
      method: 'POST',
      url: '/api/addAssignment',
      data: {name: $scope.name, dueDate: $scope.date}
    })
    .then(function(resp){
      console.log($scope)
      $scope.getAll();
    })

  }

  $scope.removeAssignment = function(index){
    $scope.homeworks.splice(index, 1);
  };
}]);
