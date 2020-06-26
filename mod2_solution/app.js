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

    var itemsToBuy = [{name:"Chocolate Cookies", quantity:"10"}, {name:"Vanilla Cookies", quantity:"1"},{name:"Butter Cookies", quantity:"15"},{name:"BIG Cookies", quantity:"3"},{name:"Small Cookies", quantity:"100"}];
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
