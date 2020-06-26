(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller("ToBuyController",ToBuyController)
.controller("AlreadyBoughtController",AlreadyBoughtController)
.service("ShoppingListCheckOffService",ShoppingListCheckOffService);


ToBuyController.$inject = ["ShoppingListCheckOffService"];
function ToBuyController(ShoppingListCheckOffService) {

    var tbc = this;

    tbc.items = ShoppingListCheckOffService.getItemsTB();

    tbc.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buy(itemIndex);
    }
}

function AlreadyBoughtController(ShoppingListCheckOffService) {

  var abc = this;

  abc.items = ShoppingListCheckOffService.getItemsAB();

}

  // Service that manages the shopping list -- BUSINESS LOGIC
  function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = ["10 Chocolate Cookies", "2 Vanilla Cookies", "8 Butter Cookies"];
    var itemsBought = [];

    //EXPOSED METHOD TO MOVE ITEMS
    service.buy = function (index) {
      itemsBought.push(itemsToBuy.splice(index, 1)[0]);
    }

    //EXPOSED METHOD TO GET ITEMS
    service.getItemsTB = function () {
      return itemsToBuy;
    }

    //EXPOSED METHOD TO GET ITEMS
    service.getItemsAB = function () {
      return itemsBought;
    }

  }

})();
