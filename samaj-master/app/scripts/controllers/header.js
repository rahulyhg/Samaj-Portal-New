'use strict';

/**
 * @ngdoc function
 * @name samajPortalApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the samajPortalApp
 */
angular.module('samajPortalApp')
  .controller('HeaderCtrl', ['$location','$localStorage',function ($location,$localStorage) {
    var vm = this;
    vm.getId=function(){
        if($localStorage.id){
            return $localStorage.id;
        }
    };
    vm.isLogin=function(){
        if($localStorage.id){
            return true;
        }else{
            return false;
        }
    };

    vm.logout=function(){
        $localStorage.$reset(); 
        $location.path('/login');
    };
  }]);
/*

vm={
  validate:function(){},
  isEmailEmpty:true
}
*/
