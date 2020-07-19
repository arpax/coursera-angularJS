
(function () {
    'use strict';

    angular.module("directives", [])
    .controller("shoppingListController1", shoppingListController1)
    .controller("shoppingListController2", shoppingListController2)
    .factory("ShoppingListFactory", ShoppingListFactory)
    .directive("itemList", ItemList);

    function ItemList(){
        var ddo = {
            templateUrl : 'components/itemList.html'
            , restrict: 'E'
            , scope : {
                controller : "=controllerName"
            }
            //template : 'TEST'
        };
        return ddo;
    
    }

shoppingListController1.$inject = ["ShoppingListFactory"];
function shoppingListController1(ShoppingListFactory) {

    var controller = this;
    controller.name = "";
    controller.amount = "";

    var manager = ShoppingListFactory();
    // CALLS SERVICE FOR BUSINESS LOGIC
    controller.newItem = function () {
        manager.addItem(controller.name, controller.amount);
    }

    controller.shoppingList = manager.getItems();

    controller.removeItem = function (itemIndex) {
        manager.remove(itemIndex);
    }
}



shoppingListController2.$inject = ["ShoppingListFactory"];
function shoppingListController2(ShoppingListFactory) {

    var controller = this;
    controller.name = "";
    controller.amount = "";
    controller.message = "";
    var manager = ShoppingListFactory(3);
    // CALLS SERVICE FOR BUSINESS LOGIC

    controller.newItem = function () {
        try {
            manager.addItem(controller.name, controller.amount);
        } catch (e) {
            controller.message = e.message;
        }
    }
    controller.shoppingList = manager.getItems();

    controller.removeItem = function (itemIndex) {
        manager.remove(itemIndex);
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

function ShoppingListFactory() {
    var factory = function (maxItems) {
        return new ShoppingListManager(maxItems);
    };
    return factory;
}


})();