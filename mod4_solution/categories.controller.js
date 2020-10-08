(function(){

    'use strict';
    angular.module('MenuApp')
    .controller("CategoriesMainController",CategoriesMainController);
    
    CategoriesMainController.$inject = ["categories"];

    function CategoriesMainController(categories) {
        var cmc = this;
        cmc.categories=categories;
    };

    
    })();