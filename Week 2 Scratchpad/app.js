
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

    angular.module("controllerAs", [])
        .controller("parentController", parentController)
        .controller("childController", childController);
    // NO NEED TO INJECT SCOPE
    function parentController() {

        var parent = this; // THIS IS A REFERENCE TO THE CONTROLLER INSTANCE
        parent.name = "PADRE";

    }

    function childController() {

        var child = this; // ASSIGN TO VARIABLE WITH SAME NAME AS THE "CONTROLLER AS" VARIABLE (CONVENTION, NOT MANDATORY)
        child.name = "FIGLIO";

    }

    angular.module("services", [])
        .controller("adderController", adderController)
        .controller("viewerController", viewerController)
        .service("ShoppingListManager", ShoppingListManager);

    adderController.$inject = ["ShoppingListManager"];
    function adderController(ShoppingListManager) {

        var adder = this;
        adder.name = "";
        adder.amount = "";
        // CALLS SERVICE FOR BUSINESS LOGIC
        adder.newItem = function () {
            ShoppingListManager.addItem(adder.name, adder.amount);
        }
    }

    viewerController.$inject = ["ShoppingListManager"];
    function viewerController(ShoppingListManager) {
        var viewer = this;

        viewer.shoppingList = ShoppingListManager.getItems();

        viewer.removeItem = function (itemIndex) {
            ShoppingListManager.remove(itemIndex);
        }
    }

    // Service that manages the shopping list -- BUSINESS LOGIC
    function ShoppingListManager() {
        var manager = this;

        var items = []; // HIDDEN ITEMS (not manager.items)

        //EXPOSED METHOD TO ADD ITEMS
        manager.addItem = function (_name, _amount) {
            var newItem = {
                name: _name,
                quantity: _amount
            };
            items.push(newItem);
        }

        //EXPOSED METHOD TO GET ITEMS
        manager.getItems = function () {
            return items;
        }

        manager.remove = function (itemIndex) {

            items.splice(itemIndex, 1);
        }

    }

    angular.module("providers", [])
        .controller("shoppingListController", shoppingListController)
        .provider("ShoppingListManager", ShoppingListManagerProvider);
        //.config(ProviderConfiguration);

        shoppingListController.$inject = ["ShoppingListManager"];
    function shoppingListController(ShoppingListManager) {

        var ctrl = this;
        ctrl.name = "";
        ctrl.amount = "";
        ctrl.message = "";
        // CALLS SERVICE FOR BUSINESS LOGIC

        ctrl.newItem = function () {
            try {
                ShoppingListManager.addItem(ctrl.name, ctrl.amount);
            } catch (e) {
                ctrl.message= e.message;
            }
        }

        ctrl.shoppingList = ShoppingListManager.getItems();

        ctrl.removeItem = function (itemIndex) {
            ShoppingListManager.remove(itemIndex);
        }
    }

    // Service that manages the shopping list -- BUSINESS LOGIC
    function ShoppingListManager(maxItems) {
        var manager = this;

        var items = []; // HIDDEN ITEMS (not manager.items)

        //EXPOSED METHOD TO ADD ITEMS
        manager.addItem = function (_name, _amount) {
            if (maxItems === undefined || items.length < maxItems) {
                var newItem = {
                    name: _name,
                    quantity: _amount
                };
                items.push(newItem);
            } else {
                throw new Error("Max items reached: " + maxItems);
            }
        }

        //EXPOSED METHOD TO GET ITEMS
        manager.getItems = function () {
            return items;
        }

        manager.remove = function (itemIndex) {

            items.splice(itemIndex, 1);
        }

    }


    function ShoppingListManagerProvider(){
        var provider = this;
        provider.config = {
            maxItems: 10
        }

        provider.$get = function() {
            var service = new ShoppingListManager(provider.config.maxItems);
            return service;
        };
    }

})();