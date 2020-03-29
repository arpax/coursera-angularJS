
(function () {
'use strict';	
angular.module('base', [])
.controller('baseController', baseController);
// Injection in modo elegante tramite servizio $inject
baseController.$inject = ['$scope', '$filter'];
function baseController($scope, $filter) {
    
    $scope.var = "lowercase string";

    $scope.filteredVar= $filter('uppercase')($scope.var);

    $scope.number = 0.5;

};

})();