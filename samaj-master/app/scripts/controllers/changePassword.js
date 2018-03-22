'use strict';

/**
 * @ngdoc function
 * @name samajPortalApp.controller:ChangePasswordCtrl
 * @description
 * # MainCtrl
 * Controller of the samajPortalApp
 */
angular.module('samajPortalApp')
  .controller('ChangePasswordCtrl', ['rest','$localStorage','$location',function (Rest,$localStorage,$location) {
        var vm=this;
        
        vm.change=function(){
            if(vm.info.currentPassword && vm.info.newPassword === vm.info.confirmPassword){
                Rest.login.save({
                  'id':$localStorage.id,
                  'password':vm.info.currentPassword
                },function(data){
                    console.log('data',data);
                    vm.info.id=$localStorage.id;
                    Rest.changePassword.save(vm.info,function(data){
                      console.log('data',data);
                      window.alert('password updated successfully');
                      $location.path('/login');
                    },function(error){
                      console.log('error',error);
                      window.alert('password update failed!');
                    });
                },function(error){
                    console.log('error',error);
                    window.alert('enter correct current password');
                });
            }else{
                window.alert('password is not same or enter current password');
            }
        };
  }]);
