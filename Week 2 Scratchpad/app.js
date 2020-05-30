
(function () {
    'use strict';

    angular.module('base', [])
        .controller('baseController', baseController)
        .filter('alternateCase', alternateCaseFilterFactory);
    // Injection in modo elegante tramite servizio $inject
    baseController.$inject = ['$scope', '$filter', 'alternateCaseFilter'];
    function baseController($scope, $filter) {
        // MORE FILTERS
        $scope.var = "lowercase string";
        $scope.filteredVar = $filter('uppercase')($scope.var);
        $scope.number = 0.5;
        // CUSTOM FILTERS
        $scope.input = "";
        $scope.index = 1;

        // Watchers
        $scope.logWatchers = function () {
            // console.log($scope);
            console.log("Number of wathers = " + $scope.$$watchersCount);
        };

        $scope.counter = 0;

        $scope.incrementOnce = function () {
            $scope.counter = 1;
        };

        $scope.increment = function () {
            $scope.counter++;
        };
        /** ADD WATCH
        $scope.$watch('counter', function(newValue,oldValue){
            console.log(newValue);
            console.log(oldValue);
        });
         */

        $scope.$watch(function () {
            console.log("DIGEST LOOP FIRED!");
        });

    };

    function alternateCaseFilterFactory() {
        return function (input, index) {

            var out = "";
            for (let i = 0; i < input.length; i++) {
                console.log(i);
                if (i % index == 0) {
                    out += input[i].toUpperCase();
                } else {
                    out += input[i].toLowerCase();
                }
            }
            return out;
        }
    }

    angular.module('digest', [])
        .controller('digestController', digestController);

    digestController.$inject = ['$scope', '$timeout'];

    function digestController($scope, $timeout) {

        $scope.counterValue = 0;

        $scope.customTimeout = function () {
            setTimeout(function () {
                $scope.counterValue++;
                console.log("counter UP");
                console.log($scope.counterValue);
            }, 2000);
        };

        $scope.digestTimeout = function () {
            setTimeout(function () {
                $scope.counterValue++;
                console.log("counter UP");
                $scope.$digest();
            }, 2000);
        };

        $scope.applyTimeout = function () {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.counterValue++;
                });
            }, 2000);
        };

        $scope.ngTimeout = function () {
            $timeout(function () {
                $scope.counterValue++;
            }, 2000);
        };

    };


    angular.module("loop",[])
    .controller("repeatController", repeatController);
    repeatController.$inject= ["$scope"];
    function repeatController ($scope) {

        $scope.shoppingList= [
            { name : "Gelato", quantity : 1 }, { name : "Frutta", quantity : 2 }
        ];

        $scope.newItem = function(){
            if($scope.newName && $scope.newAmount ){
            var newItem = { name : $scope.newName, quantity : $scope.newAmount}
            $scope.shoppingList.push(newItem);
            $scope.newName = null;
            $scope.newAmount = null;
            } else {
                alert("Inserire nome e quantità");
            }
        }
    }


})();