(function(){

    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);


    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to tab 1 if no other URL matches
    $urlRouterProvider.otherwise('/home');

    // Set up UI states
    $stateProvider
        .state('home', {
        url: '/home',
        templateUrl: 'src/menuApp/home.html',

        })

        .state('categories', {
        url: '/categories',
        templateUrl: 'src/menuApp/categories/categoriesMain.html',
        controller: 'CategoriesMainController as cmc',
        resolve: {
            categories: ['MenuDataService', function(MenuDataService){
            return MenuDataService.getAllCategories();
        }]
        }
        })

        .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'src/menuApp/items/itemsMain.html',
        controller: 'ItemsMainController as imc',
        resolve: {
            items: ['$stateParams','MenuDataService', function($stateParams, MenuDataService){
                //console.log("resolving items");
                return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
            }]
        }
        });
    }
})();