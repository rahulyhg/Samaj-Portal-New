'use strict';

/**
 * @ngdoc function
 * @name samajPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the samajPortalApp
 */
angular.module('samajPortalApp')
  .controller('ProfileCtrl', ['$localStorage', 'rest', 'docService', '$scope', '$location', '$routeParams', function ($localStorage, Rest, docService, $scope, $location, $routeParams) {
    var vm = this;
    vm.edit = false;
    $scope.file = '';
    vm.self = $localStorage.id === $routeParams.id;
    vm.profile = {};
    vm.getProfile = function () {
      if ($localStorage.id) {
        Rest.profile.get({
          id: $routeParams.id
        }, function (data) {
          if (data.birthDate) {
            data.birthDate = new Date(data.birthDate.substring(0, (data.birthDate.length - 5)));
          }
          vm.profile = data;
          vm.getChildrenInformation();
          vm.getMaternalUncleInformation();
          vm.getPaternalUncleInformation();
          vm.getSiblingInformation();
          Rest.document.get({
            id: data.id
          }, function (imgData) {
            if (imgData.data === null) {
              vm.isImageFound = false;
            } else {
              vm.isImageFound = true;
              vm.imageData = imgData.data;
            }
          }, function (error) {
            vm.isImageFound = false;
            console.log('Error', error);
          });
        }, function () {
          console.log('Error occured while getting profile');
        });
      }
    };
    vm.upload = function () {
      var file = $scope.file;
      if (file && file !== '' && file.size <= 9000 && file.type === 'image/jpeg') {
        docService.saveDoc(file, vm.profile.id)
          .then(
            function (response) {
              window.alert('file uploaded successfully.');
              vm.getProfile();
              console.log('response', response);
            },
            function (errResponse) {
              console.log('errResponse', errResponse);
            }
          );
      } else {
        if (file === '') {
          window.alert('Please choose file');
        } else {
          window.alert('file size must be less than 4 kb and type jpg .');
        }

        //$scope.file=null;
      }

    };
    vm.getProfile();
    vm.save = function (profileForm) {
      console.log('profle' + profileForm);
      if ($localStorage.id) {
        Rest.profile.update(vm.profile, function (data) {
          window.alert('profile updated successfully');
          vm.edit = false;
          console.log('profile', data);
        }, function () {
          console.log('Error occured while getting profile');
        });
      }
    };

    vm.editProfile = function () {
      vm.edit = !vm.edit;
    };

    vm.getSiblingInformation = function () {
      if (vm.profile.fatherFirstName && vm.profile.fatherMiddleName && vm.profile.fatherLastName) {
        var filter = [];
        var fatherFirstQuery = {};
        fatherFirstQuery.key = 'fatherFirstName';
        fatherFirstQuery.operator = 'equal';
        fatherFirstQuery.value = vm.profile.fatherFirstName;

        var fatherMiddleQuery = {};
        fatherMiddleQuery.key = 'fatherMiddleName';
        fatherMiddleQuery.operator = 'equal';
        fatherMiddleQuery.value = vm.profile.fatherMiddleName;

        var fatherLastQuery = {};
        fatherLastQuery.key = 'fatherLastName';
        fatherLastQuery.operator = 'equal';
        fatherLastQuery.value = vm.profile.fatherLastName;

        filter.push(fatherFirstQuery);
        filter.push(fatherMiddleQuery);
        filter.push(fatherLastQuery);


        var searchObj = {
          'filter': filter
        };
        Rest.browse.save(searchObj, function (data) {
          vm.searchDataSibling = data;
        }, function (error) {
          console.log('error', error);
        });
      }
    };

    vm.getChildrenInformation = function () {
      if (vm.profile.firstName && vm.profile.middleName && vm.profile.lastName) {
        var filter = [];
        var fatherFirstQuery = {};
        fatherFirstQuery.key = 'fatherFirstName';
        fatherFirstQuery.operator = 'equal';
        fatherFirstQuery.value = vm.profile.firstName;

        var fatherMiddleQuery = {};
        fatherMiddleQuery.key = 'fatherMiddleName';
        fatherMiddleQuery.operator = 'equal';
        fatherMiddleQuery.value = vm.profile.middleName;

        var fatherLastQuery = {};
        fatherLastQuery.key = 'fatherLastName';
        fatherLastQuery.operator = 'equal';
        fatherLastQuery.value = vm.profile.LastName;

        filter.push(fatherFirstQuery);
        filter.push(fatherMiddleQuery);
        filter.push(fatherLastQuery);


        var searchObj = {
          'filter': filter
        };
        Rest.browse.save(searchObj, function (data) {
          vm.searchChildrenData = data;
        }, function (error) {
          console.log('error', error);
        });
      }
    };

    vm.getPaternalUncleInformation = function () {
      if (vm.profile.fatherFirstName && vm.profile.fatherMiddleName && vm.profile.fatherLastName) {
        var filter = [];
        var fatherFirstQuery = {};
        fatherFirstQuery.key = 'firstName';
        fatherFirstQuery.operator = 'equal';
        fatherFirstQuery.value = vm.profile.fatherFirstName;

        var fatherMiddleQuery = {};
        fatherMiddleQuery.key = 'middleName';
        fatherMiddleQuery.operator = 'equal';
        fatherMiddleQuery.value = vm.profile.fatherMiddleName;

        var fatherLastQuery = {};
        fatherLastQuery.key = 'lastName';
        fatherLastQuery.operator = 'equal';
        fatherLastQuery.value = vm.profile.fatherLastName;

        filter.push(fatherFirstQuery);
        filter.push(fatherMiddleQuery);
        filter.push(fatherLastQuery);


        var searchObj = {
          'filter': filter
        };

        Rest.browse.save(searchObj, function (data) {
          var filter = [];
          var fatherFirstQuery = {};
          fatherFirstQuery.key = 'firstName';
          fatherFirstQuery.operator = 'equal';
          fatherFirstQuery.value = data.fatherFirstName;

          var fatherMiddleQuery = {};
          fatherMiddleQuery.key = 'middleName';
          fatherMiddleQuery.operator = 'equal';
          fatherMiddleQuery.value = data.fatherMiddleName;

          var fatherLastQuery = {};
          fatherLastQuery.key = 'lastName';
          fatherLastQuery.operator = 'equal';
          fatherLastQuery.value = data.fatherLastName;

          filter.push(fatherFirstQuery);
          filter.push(fatherMiddleQuery);
          filter.push(fatherLastQuery);


          var searchObj = {
            'filter': filter
          };
          Rest.browse.save(searchObj, function (data) {
            vm.searchDataPaternalGrandFather = data;
          }, function (error) {
            console.log('error', error);
          });
        }, function (error) {
          console.log('error', error);
        });

        Rest.browse.save(searchObj, function (data) {
          var filter = [];
          var motherFirstQuery = {};
          motherFirstQuery.key = 'firstName';
          motherFirstQuery.operator = 'equal';
          motherFirstQuery.value = data.motherFirstName;

          var motherMiddleQuery = {};
          motherMiddleQuery.key = 'middleName';
          motherMiddleQuery.operator = 'equal';
          motherMiddleQuery.value = data.motherMiddleName;

          var motherLastQuery = {};
          motherLastQuery.key = 'lastName';
          motherLastQuery.operator = 'equal';
          motherLastQuery.value = data.motherLastName;

          filter.push(motherFirstQuery);
          filter.push(motherMiddleQuery);
          filter.push(motherLastQuery);


          var searchObj = {
            'filter': filter
          };
          Rest.browse.save(searchObj, function (data) {
            vm.searchDataPaternalGrandMother = data;
          }, function (error) {
            console.log('error', error);
          });
        }, function (error) {
          console.log('error', error);
        });

        Rest.browse.save(searchObj, function (data) {
          var filter = [];
          var fatherFirstQuery = {};
          fatherFirstQuery.key = 'fatherFirstName';
          fatherFirstQuery.operator = 'equal';
          fatherFirstQuery.value = data.fatherFirstName;

          var fatherMiddleQuery = {};
          fatherMiddleQuery.key = 'fatherMiddleName';
          fatherMiddleQuery.operator = 'equal';
          fatherMiddleQuery.value = data.fatherMiddleName;

          var fatherLastQuery = {};
          fatherLastQuery.key = 'fatherLastName';
          fatherLastQuery.operator = 'equal';
          fatherLastQuery.value = data.fatherLastName;

          filter.push(fatherFirstQuery);
          filter.push(fatherMiddleQuery);
          filter.push(fatherLastQuery);


          var searchObj = {
            'filter': filter
          };
          Rest.browse.save(searchObj, function (data) {
            vm.searchDataPaternal = data;
          }, function (error) {
            console.log('error', error);
          });
        }, function (error) {
          console.log('error', error);
        });
      }
    };

    vm.getMaternalUncleInformation = function () {
      if (vm.profile.motherFirstName && vm.profile.motherMiddleName && vm.profile.motherLasttName) {
        var filter = [];
        var motherFirstQuery = {};
        motherFirstQuery.key = 'firstName';
        motherFirstQuery.operator = 'equal';
        motherFirstQuery.value = vm.profile.motherFirstName;

        var motherMiddleQuery = {};
        motherMiddleQuery.key = 'middleName';
        motherMiddleQuery.operator = 'equal';
        motherMiddleQuery.value = vm.profile.motherMiddleName;

        var motherLastQuery = {};
        motherLastQuery.key = 'lastName';
        motherLastQuery.operator = 'equal';
        motherLastQuery.value = vm.profile.motherLasttName;

        filter.push(motherFirstQuery);
        filter.push(motherMiddleQuery);
        filter.push(motherLastQuery);


        var searchObj = {
          'filter': vm.filter
        };
        Rest.browse.save(searchObj, function (data) {
          var filter = [];
          var fatherFirstQuery = {};
          fatherFirstQuery.key = 'firstName';
          fatherFirstQuery.operator = 'equal';
          fatherFirstQuery.value = data.fatherFirstName;

          var fatherMiddleQuery = {};
          fatherMiddleQuery.key = 'middleName';
          fatherMiddleQuery.operator = 'equal';
          fatherMiddleQuery.value = data.fatherMiddleName;

          var fatherLastQuery = {};
          fatherLastQuery.key = 'lastName';
          fatherLastQuery.operator = 'equal';
          fatherLastQuery.value = data.fatherLastName;

          filter.push(fatherFirstQuery);
          filter.push(fatherMiddleQuery);
          filter.push(fatherLastQuery);


          var searchObj = {
            'filter': filter
          };
          Rest.browse.save(searchObj, function (data) {
            vm.searchDatMaternalGrandFather = data;
          }, function (error) {
            console.log('error', error);
          });
        }, function (error) {
          console.log('error', error);
        });

        Rest.browse.save(searchObj, function (data) {
          var filter = [];
          var motherFirstQuery = {};
          motherFirstQuery.key = 'firstName';
          motherFirstQuery.operator = 'equal';
          motherFirstQuery.value = data.motherFirstName;

          var motherMiddleQuery = {};
          motherMiddleQuery.key = 'middleName';
          motherMiddleQuery.operator = 'equal';
          motherMiddleQuery.value = data.motherMiddleName;

          var motherLastQuery = {};
          motherLastQuery.key = 'lastName';
          motherLastQuery.operator = 'equal';
          motherLastQuery.value = data.motherLastName;

          filter.push(motherFirstQuery);
          filter.push(motherMiddleQuery);
          filter.push(motherLastQuery);


          var searchObj = {
            'filter': filter
          };
          Rest.browse.save(searchObj, function (data) {
            vm.searchDataMaternalGrandMother = data;
          }, function (error) {
            console.log('error', error);
          });
        }, function (error) {
          console.log('error', error);
        });

        Rest.browse.save(searchObj, function (data) {
          var filter = [];
          var fatherFirstQuery = {};
          fatherFirstQuery.key = 'fatherFirstName';
          fatherFirstQuery.operator = 'equal';
          fatherFirstQuery.value = data.fatherFirstName;

          var fatherMiddleQuery = {};
          fatherMiddleQuery.key = 'fatherMiddleName';
          fatherMiddleQuery.operator = 'equal';
          fatherMiddleQuery.value = data.fatherMiddleName;

          var fatherLastQuery = {};
          fatherLastQuery.key = 'fatherLastName';
          fatherLastQuery.operator = 'equal';
          fatherLastQuery.value = data.fatherLastName;

          filter.push(fatherFirstQuery);
          filter.push(fatherMiddleQuery);
          filter.push(fatherLastQuery);


          var searchObj = {
            'filter': filter
          };
          Rest.browse.save(searchObj, function (data) {
            vm.searchDataMaternal = data;
          }, function (error) {
            console.log('error', error);
          });
        }, function (error) {
          console.log('error', error);
        });
      }
    };
  }]);
