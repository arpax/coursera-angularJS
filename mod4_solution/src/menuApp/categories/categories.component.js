(function(){

    'use strict';
    angular.module('MenuApp')
    .component("categories",{
        templateUrl : 'src/menuApp/categories/categoriesComponent.html',
        bindings : {
            categoryList : '<'
        }
    });

    
    })();