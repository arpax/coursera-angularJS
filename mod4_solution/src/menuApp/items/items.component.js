(function(){

    'use strict';
    angular.module('MenuApp')
    .component("items",{
        templateUrl : 'src/menuApp/items/itemsComponent.html',
        bindings : {
            itemList : '<'
        }
    });
    
})();