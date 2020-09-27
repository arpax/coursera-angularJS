(function(){

    'use strict';
    angular.module('MenuApp')
    .component("items",{
        templateUrl : '/items',
        controller : 'itemsController',
        bindings : {
            items : '<'
        }
    });

    
    })();