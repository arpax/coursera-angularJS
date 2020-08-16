(function(){ 

    'use strict';
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .directive("foundItems",FoundItemsDirective)
    .constant('ItemsURL', "https://davids-restaurant.herokuapp.com/menu_items.json");
    ;

    NarrowItDownController.$inject = ["MenuSearchService"];
    function NarrowItDownController(MenuSearchService){


        var controller =this;
        controller.getItems = function (){
            var matchedMenuItemsPromise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);

            matchedMenuItemsPromise.then( function(result){
                controller.found = result;
            });
        }
    };

    MenuSearchService.$inject =["$http","ItemsURL"];
    function MenuSearchService($http,ItemsURL){
        var service= this;

        service.getMatchedMenuItems = function(searchTerm){
            
            var resultPromise = $http({
                method: "GET",
                url: (ItemsURL)
            })

            return resultPromise.then(function (result) {    
                // process result and only keep items that match
                var foundItems = [];
                var menuItems= result.data.menu_items;
                for (let index = 0; index < menuItems.length; ++index){
                    var item = menuItems[index];
                    if (item.description.indexOf(searchTerm)!= -1){
                        foundItems.push(item);
                    }
                }
                // return processed items
                // console.log(foundItems);
                return foundItems;
            });

            };
        
    };

    function FoundItemsDirective(){
        var ddo = {
            templateUrl : 'components/foundItems.html'
            , scope : {
                found : "<"
            }
        };
        return ddo;
    }

})();