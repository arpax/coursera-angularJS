
(function () {
'use strict';	
angular.module('base', [])
.controller('baseController', function($scope) {

$scope.var ="A variable";
$scope.simplefunction = function () {
    return "Returning string";
}
$scope.function = function (param) {
    return "Rerturning parameter: "+ param;
}

});

})();