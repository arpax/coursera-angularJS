
(function () {
'use strict';	
angular.module('base', [])
.controller('baseController', baseController)
.filter('alternateCase',alternateCaseFilterFactory);
// Injection in modo elegante tramite servizio $inject
baseController.$inject = ['$scope', '$filter','alternateCaseFilter'];
function baseController($scope, $filter) {
    // MORE FILTERS
    $scope.var = "lowercase string";
    $scope.filteredVar= $filter('uppercase')($scope.var);
    $scope.number = 0.5;
    // CUSTOM FILTERS
    $scope.input = "";
    $scope.index = 1;
    
};

        function alternateCaseFilterFactory() {
            return function(input, index) {
                
                var out = "";
                for (let i = 0; i < input.length; i++) {
                    console.log(i);
                    if (i % index == 0) {
                        out += input[i].toUpperCase();
                    } else {
                        out += input[i];
                    }
                }
                return out;
            }
        }

})();