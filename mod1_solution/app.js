(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){

$scope.lunchList = "The list";
$scope.lunchMessage = "The message";
$scope.lunchCheck = function (){

$scope.lunchMessage = $scope.lunchList;
}


}

})();
