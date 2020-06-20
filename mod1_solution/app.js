(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){

$scope.lunchList;
$scope.lunchMessage;

$scope.lunchCheck = function (){

  if (!$scope.lunchList) {
    $scope.lunchMessage = "Please enter data first";
    return;
  }
  var lunchElements = $scope.lunchList.split(",");
  var validElements = 0;

  for (var i in lunchElements){
    var element = lunchElements[i].trim();
     if (element) {
       console.debug(element +" is a valid element");
       validElements++;
     } else {
       console.debug(element +" is NOT a valid element");
     }
    }

    if (validElements < 3) {
      $scope.lunchMessage = "Enjoy!";
    } else {
      $scope.lunchMessage = "Too much!";
    }

  }

}

})();
