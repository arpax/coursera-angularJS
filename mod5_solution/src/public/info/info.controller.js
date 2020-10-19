(function () {
    "use strict";
    
    angular.module('public')
    .controller('InfoController', InfoController);
    
    InfoController.$inject = ['MenuService'];
    function InfoController(MenuService) {
        var $ctrl = this;
        $ctrl.subscriptionData = MenuService.getSubscriptionData();

    }
    
})();
    