(function(){

    'use strict';
    angular.module('MenuApp')
    .component("categories",{
        templateUrl : '/categories',
        controller : 'categoriesController',
        bindings : {
            categoryList : '<'
        }
    });

    
    })();