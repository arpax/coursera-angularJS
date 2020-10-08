(function(){

'use strict';
angular.module('MenuApp',['ui.router','data'])
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to tab 1 if no other URL matches
  $urlRouterProvider.otherwise('/home');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'src/home.html',

    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/categoriesMain.html',
      controller: 'CategoriesMainController as cmc',
      resolve: {
        categories: ['MenuDataService', function(MenuDataService){
          return MenuDataService.getAllCategories();
       }]
      }
    })

    .state('items', {
      url: '/items/{categoryShortName}',
      templateUrl: 'src/items.html',
      controller: 'itemsController as items',
      resolve: {
        categories: ['MenuDataService'], function(MenuDataService){
          return MenuDataService,getItemsForCategory(categoryShortName);
        }
      }
    });
}


})();