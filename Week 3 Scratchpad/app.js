(function () {

    'use strict';


    angular.module('ShoppingListPromiseApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListService', ShoppingListService)
        .service('ValidationService', ValidationService)


    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(shoppingListService) {
        var list = this;

        list.itemName = "";
        list.itemQuantity = "";

        list.addItemCallback = function () {
            shoppingListService.addItemCallback(list.itemName, list.itemQuantity)
            list.itemName = "";
            list.itemQuantity = "";
        }

        list.addItem2 = function () {
            shoppingListService.addItem2(list.itemName, list.itemQuantity)
            list.itemName = "";
            list.itemQuantity = "";
        }

        list.addItem3 = function () {
            shoppingListService.addItem3(list.itemName, list.itemQuantity)
            list.itemName = "";
            list.itemQuantity = "";
        }

        list.items = shoppingListService.getItems();

        list.removeItem = function (itemIndex) {
            shoppingListService.removeItem(itemIndex);
        }

    }

    ShoppingListService.$inject = ["$q", "ValidationService"];
    function ShoppingListService($q, validationService) {

        var service = this;

        var itemList = [];

        // Calling the validation service with callbacks
        service.addItemCallback = function (name, quantity) {

            var promise = validationService.checkName(name); //THIS RETURNS A PROMISE OBJECT

            // Execute the name check and manage response
            // First argument --> promise resolved
            // Second argument --> promise rejected
            promise.then(function (response) {

                var nextPromise = validationService.checkQuantity(quantity); //THIS RETURNS A PROMISE OBJECT

                // Execute the quantity check and manage response.
                // First argument --> promise resolved
                // Second argument --> promise rejected
                nextPromise.then(function (nextResponse) {

                    // Both Validations passed
                    var dummyItem = { "name": name, "quantity": quantity }
                    itemList.push(dummyItem);

                }, function (nextResponse) {
                    // Quantity validation not passed
                    console.log(nextResponse.message);
                });

            }, function (response) {
                // Name validation not passed
                console.log(response.message);

            });

        }

        // Calling the validation service chaining promises
        service.addItem2 = function (name, quantity) {

            var promise = validationService.checkName(name);

            promise.then(function (response) {
                return validationService.checkQuantity(quantity);
            }).then(function (response) {

                // Validation (both) passed
                var dummyItem = { "name": name, "quantity": quantity }
                itemList.push(dummyItem);

            }).catch(function (response) {
                // Validation (any) not passed
                console.log(response.message);
            });


        }

        service.addItem3 = function (name, quantity) {

            // Calling all the validation services
            $q.all([validationService.checkName(name), validationService.checkQuantity(quantity)])
                .then(function (response) {

                    // Validation passed
                    var dummyItem = { "name": name, "quantity": quantity }
                    itemList.push(dummyItem);

                }).catch(function (response) {
                    // Validation (any) not passed
                    console.log(response.message);
                });

        }




        service.getItems = function () {
            return itemList;
        }

        service.removeItem = function (itemIndex) {
            itemList.splice(itemIndex, 1);
        }
    }

    // Validation services
    ValidationService.$inject = ["$q", "$timeout"]; // injecting the $q service (promise API)
    function ValidationService($q, $timeout) {

        var validation = this;

        validation.checkName = function (name) {
            var deferred = $q.defer(); // Returns an API object
            var result = { message: "" };

            $timeout(function () {
                if (name.toLowerCase().indexOf("cookie") === -1) {
                    deferred.resolve(result); // Promise is successfully resovled
                } else {
                    result.message = "cookies not allowed"
                    deferred.reject(result); // Promise is rejected (error)
                }


            }, 3000);

            return deferred.promise; // Returns promise

        };

        validation.checkQuantity = function (quantity) {
            var deferred = $q.defer();
            var result = { message: "" };

            $timeout(function () {
                if (quantity <= 5) {
                    deferred.resolve(result);
                } else {
                    result.message = "maximum 5 boxes"
                    deferred.reject(result);
                }

            }, 1000);

            return deferred.promise;

        }


    }


    angular.module('http', [])
        .controller('RestaurantController', RestaurantController)
        .service('CategoryManager', CategoryManager)
        .constant('BaseURL', "https://davids-restaurant.herokuapp.com");

    RestaurantController.$inject = ["CategoryManager"];
    function RestaurantController(CategoryManager) {
        var ctrl = this;

        var categoryPromise = CategoryManager.getCategories();
        categoryPromise
            .then(function (response) {
                ctrl.items = response.data;
            })
            .catch(function () {
                console.log("CANNOT RETRIEVE CATEGORIES");
            });


        ctrl.getMenuByCategory = function(short_name){
            var menuPromise = CategoryManager.getMenuByCategory(short_name);
            menuPromise.then(function(response){
                console.log(response.data);
            }).catch(function () {
                console.log("CANNOT RETRIEVE MENU");
            });

        }

    }

    CategoryManager.$inject = ["$http", "BaseURL"];
    function CategoryManager($http, BaseURL) {

        var manager = this;

        manager.getCategories = function () {

            var response = $http({
                method: "GET",
                url: (BaseURL + "/categories.json")
            })

            return response;

        }

        manager.getMenuByCategory = function (short_name) {

            var response = $http({
                method: "GET"
                , url: (BaseURL + "/menu_items.json")
                , params: {category:short_name}
            })

            return response;

        }

    }

})();