(function(){

    'use strict';
    angular.module('data',)
    .service('MenuDataService',MenuDataService)
    .constant('BaseURL', "https://davids-restaurant.herokuapp.com");
       

    MenuDataService.$inject = ["$http", "BaseURL"];
    function MenuDataService ($http, BaseURL){
        var service = this;

        service.getAllCategories= function(){

            var response = $http({
                method: "GET",
                url: (BaseURL + "/categories.json")
            })

            return response;

        };
        

        service.getItemsForCategory= function(categoryShortName){

            var response = $http({
                method: "GET",
                url: (BaseURL + "/menu_items.json?category="+categoryShortName)
            })

            return response;
        }
    }
    
})();