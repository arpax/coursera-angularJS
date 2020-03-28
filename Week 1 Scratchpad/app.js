
(function () {
'use strict';	
angular.module('base', [])
.controller('baseController', baseController);
// Injection in modo elegante tramite servizio $inject
baseController.$inject = ['$scope', '$filter'];
function baseController($scope, $filter) {
    
    // BASE EXAMPLES
    $scope.var ="A variable";
    $scope.simplefunction = function () {
        return "Returning string";
    }
    $scope.function = function (param) {
        return "Rerturning parameter: "+ param;
    }

    // UPPERCASE FILTER
    $scope.upper = function() {
        var toUppercase= $filter("uppercase");
        $scope.var = toUppercase($scope.var);
    }

    //STATE
    $scope.sliderValue;
    $scope.tlstatus = '';
    // MAP sliderValue TO tlstatus
    $scope.updateState = function(){
        if($scope.sliderValue){
            $scope.tlstatus = "Green";
        } else {
            $scope.tlstatus = "Red";
        }
    }

};

angular.module('nameCalc', [])
.controller('nameCalcCtrl', ['$scope',nameCalcCtrl]);
// Injection attraverso array di oggetti come secondo argomento del controller. Ultimo argomento è sempre la funzione.
function nameCalcCtrl($scope){
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
};

})();