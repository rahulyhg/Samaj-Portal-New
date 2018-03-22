'use strict';

/**
 * @ngdoc function
 * @name samajPortalApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the samajPortalApp
 */
angular.module('samajPortalApp')
  .controller('LoginCtrl', ['rest','$location','$localStorage',function (Rest,$location,$localStorage) {
    var vm = this;
    vm.isLoginSuccessful=true;
    vm.logIn = function () {
      Rest.login.save({
        'id':vm.userName,
        'password':vm.password
      },function(data){
          console.log('success login');
          $localStorage.token=data.headers.authorization;
          $localStorage.id=vm.userName;
          $location.path('/profile/'+vm.userName);
      },function(error){
          vm.isLoginSuccessful=false;
          console.log('Error',error);
      });
    };
  }]);
/*

vm={
  validate:function(){},
  isEmailEmpty:true
}
*/
