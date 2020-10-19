(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignController', SignController);
    
    SignController.$inject = ['MenuService'];
    function SignController(MenuService) {
        var $ctrl = this;
        $ctrl.message ="";
        $ctrl.go = function(){
          $ctrl.message ="";
            // check if form is valid
            console.log($ctrl);
            MenuService.getMenuItem($ctrl.dish)
            .then(function(response) {
                // if valid, then subscribe!
                var data = {};                
                data.firstName=$ctrl.firstName;
                data.lastName=$ctrl.lastName;
                data.email=$ctrl.email;
                data.phone=$ctrl.phone;
                data.dish= response.data
                MenuService.setSubscriptionData(data);
                $ctrl.message="Your information has been saved";
              })
              .catch(function(){
                // if not valid, warn user
                $ctrl.message="No such menu number exists";
              });
        };
    }
    
})();
    