(function(){

    'use strict';
    angular.module('MenuApp')
    .component("categories",{
        templateUrl : 'src/categoriesComponent.html',
        bindings : {
            categoryList : '<'
        }
    });

    
    })();