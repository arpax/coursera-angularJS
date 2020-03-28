
(function () {
'use strict';	
angular.module('base', [])
.controller('baseController', function($scope, $filter) {

$scope.var ="A variable";
$scope.simplefunction = function () {
    return "Returning string";
}
$scope.function = function (param) {
    return "Rerturning parameter: "+ param;
}

$scope.upper = function() {
    var toUppercase= $filter("uppercase");
    $scope.var = toUppercase($scope.var);
}

});

angular.module('nameCalc', [])
.controller('nameCalcCtrl', function($scope){

$scope.name = "";
$scope.value = 0;

$scope.refreshValue = function () {
    // console.log("calling refresh");
    $scope.value = calculateValue($scope.name);

}

function calculateValue (string) {
    var value = 0;
    for (var index = 0; index < string.length; index++) {
        // console.log(string.charCodeAt(index));
        value += string.charCodeAt(index);
    }
    return value;
}


});


})();