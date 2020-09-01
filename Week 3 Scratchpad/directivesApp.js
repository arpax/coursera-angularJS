
(function () {
    'use strict';

    angular.module("directives", [])
    .controller("shoppingListController1", shoppingListController1)
    .controller("shoppingListController2", shoppingListController2)
    .controller("shoppingListDirectiveController", shoppingListDirectiveController)
    .factory("ShoppingListFactory", ShoppingListFactory)
    .directive("itemList", ItemList);

    function ItemList(){
        var ddo = {
            templateUrl : 'components/itemList.html'
            , restrict: 'E'
            , scope : {
                // controller : "=controllerName" // directive take care of this
                items :"<"
                , title : "@title"
            }
            , controller : 'shoppingListDirectiveController'
            , controllerAs : "controller"
            , bindToController : true
            //template : 'TEST'
        };
        return ddo;
    
    }

    shoppingListDirectiveController.$inject = ["ShoppingListFactory"];
    function shoppingListDirectiveController(ShoppingListFactory) {

        var controller = this;

        var manager = ShoppingListFactory();
        controller.shoppingList = manager.getItems();

        var title = "LIST 1 ";
        controller.title = title + " ( " + controller.shoppingList.length + " ) ";

        this.isCookieInList = function () {
            for (item in shoppingList) {
                var name = item.name;
                if (name.toLowerCase().indexOf("cookie") !== -1) {
                    return true;
                }
                return false;
            }
        }
    }


shoppingListController1.$inject = ["ShoppingListFactory"];
function shoppingListController1(ShoppingListFactory) {

    var controller = this;
    controller.name = "";
    controller.amount = "";

    var manager = ShoppingListFactory();
    controller.shoppingList = manager.getItems();

    // CALLS SERVICE FOR BUSINESS LOGIC
    controller.newItem = function () {
        manager.addItem(controller.name, controller.amount);
        controller.title = title + " ( " + controller.shoppingList.length + " ) ";
    }
    
    
    controller.removeItem = function (itemIndex) {
        manager.remove(itemIndex);
        controller.title = title + " ( " + controller.shoppingList.length + " ) ";
    }

    var title = "LIST 1 ";
    controller.title = title + " ( " + controller.shoppingList.length + " ) ";
}



shoppingListController2.$inject = ["ShoppingListFactory"];
function shoppingListController2(ShoppingListFactory) {

    var controller = this;
    controller.name = "";
    controller.amount = "";
    controller.message = "";


    var manager = ShoppingListFactory(3);

    controller.shoppingList = manager.getItems();
    
    // CALLS SERVICE FOR BUSINESS LOGIC
    controller.newItem = function () {
        try {
            manager.addItem(controller.name, controller.amount);
            controller.title = title + " ( " + controller.shoppingList.length + " ) ";
        } catch (e) {
            controller.message = e.message;
        }
    }

    controller.removeItem = function (itemIndex) {
        manager.remove(itemIndex);
        controller.title = title + " ( " + controller.shoppingList.length + " ) ";
    }

    var title = "LIST 2 ";
    controller.title = title + " ( " + controller.shoppingList.length + " ) ";



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