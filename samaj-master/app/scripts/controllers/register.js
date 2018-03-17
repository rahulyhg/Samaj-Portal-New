'use strict';

/**
 * @ngdoc function
 * @name samajPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the samajPortalApp
 */
angular.module('samajPortalApp')
  .controller('RegisterCtrl', ['rest','$location','$localStorage','$routeParams',function (Rest,$location,$localStorage,$routeParams) {
    var vm = this;
    vm.profile = {};
    vm.profile.vadhuVarMelava = null;
    vm.isPasswordConfirmPasswordSame = true;
    vm.showAlert=false;
    
    if($routeParams.flag){
      vm.profile.vadhuVarMelava=true;
    }else{
      vm.profile.vadhuVarMelava=false;
    }

    vm.register = function () {
      if (vm.profile.password === vm.profile.confirmPassword) {
        Rest.register.save(vm.profile,
          function (data) {
            $localStorage.$reset();
            $location.path('/login');
            console.log('data',data);
          },
          function (error) {
              console.log('Error occured while register',error);
              vm.alertMessage='Error occured while register,Contact admin';
              vm.showAlert=true;
              vm.alertType='danger';
          });
      }else{
        vm.isPasswordConfirmPasswordSame=false;
        angular.element('#password').focus();
        vm.profile.password='';
        vm.profile.confirmPassword='';
      }
    };


    vm.isVadhuVarMelava = function () {
      return vm.profile.vadhuVarMelava === null;
    };

    vm.setVadhuVarMelava = function (ans) {
      if (ans === 'Yes') {
        vm.profile.vadhuVarMelava = true;
      } else {
        vm.profile.vadhuVarMelava = false;
      }
    };

    vm.backToVadhuVarMelavaSelection = function () {
      vm.profile.vadhuVarMelava = null;
    };
  }]);
