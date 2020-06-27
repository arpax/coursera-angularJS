(function () {

    'use strict';


    angular.module('ShoppingListPromiseApp',[])
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListService', ShoppingListService);


    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(shoppingListService) {
        var list = this;

        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function () {
            shoppingListService.addItem(list.itemName, list.itemQuantity)
            list.itemName = "";
            list.itemQuantity = "";
        }

        list.items = shoppingListService.getItems();

        list.removeItem = function (itemIndex){
            shoppingListService.removeItem(itemIndex);
        }

    }


    function ShoppingListService() {

        var service = this;

        var itemList = [];

        service.addItem = function (name, quantity) {
            var dummyItem = { "name": name, "quantity": quantity }
            itemList.push(dummyItem);
        }

        service.getItems = function () {
            return itemList;
        }

        service.removeItem = function(itemIndex){
            itemList.splice(itemIndex,1);
        }
    }


})();