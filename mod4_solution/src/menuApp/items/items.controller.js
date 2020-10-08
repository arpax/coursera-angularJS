(function(){

    'use strict';
    angular.module('MenuApp')
    .controller("ItemsMainController",ItemsMainController);
    
    ItemsMainController.$inject = ["items"];

    function ItemsMainController(items) {
        var imc = this;
        imc.items=items.data.menu_items;
        console.log(imc.items);
    };

    
    })();