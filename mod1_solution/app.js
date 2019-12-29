(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){

$scope.lunchList;
$scope.lunchMessage;
$scope.lunchCheck = function (){
  var lunchElements = $scope.lunchList.split(",");
  if (lunchElements.length < 3) {
    $scope.lunchMessage = "MORE";
  } else {
    $scope.lunchMessage = "TOO MUCH";
  }

  }

}

})();
