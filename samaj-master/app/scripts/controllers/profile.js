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
          vm.getPaternalGrandFatherInformation();
          vm.getPaternalGrandMotherInformation();
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
          vm.getProfile();
        }, function () {
          console.log('Error occured while getting profile');
        });
      }
    };

    vm.editProfile = function () {
      vm.edit = !vm.edit;
    };

    //sibling 
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
          data = filterSelf(data);
          vm.searchDataSibling = data;
        }, function (error) {
          console.log('error', error);
        });
      }
    };
    var filterSelf = function (data) {
      var dataFilterd = {};
      dataFilterd._embedded = {};
      dataFilterd._embedded.personList = [];
      if (data.page.totalElements > 0) {
        for (var i = 0; i < data._embedded.personList.length; i++) {
          if (data._embedded.personList[i].id !== vm.profile.id) {
            dataFilterd._embedded.personList.push(data._embedded.personList[i]);
          }
        }
      }
      return dataFilterd;
    };


    //children
    vm.getChildrenInformation = function () {
      if (vm.profile.firstName && vm.profile.middleName && vm.profile.lastName) {
        var filter = [];
        var fatherFirstQuery = {};
        fatherFirstQuery.key = vm.profile.gender === 'Male' ? 'fatherFirstName' : 'motherFirstName';
        fatherFirstQuery.operator = 'equal';
        fatherFirstQuery.value = vm.profile.firstName;

        var fatherMiddleQuery = {};
        fatherMiddleQuery.key = vm.profile.gender === 'Male' ? 'fatherMiddleName' : 'motherMiddleName';
        fatherMiddleQuery.operator = 'equal';
        fatherMiddleQuery.value = vm.profile.middleName;

        var fatherLastQuery = {};
        fatherLastQuery.key = vm.profile.gender === 'Male' ? 'fatherLastName' : 'motherLastName';
        fatherLastQuery.operator = 'equal';
        fatherLastQuery.value = vm.profile.lastName;

        filter.push(fatherFirstQuery);
        filter.push(fatherMiddleQuery);
        filter.push(fatherLastQuery);


        var searchObj = {
          'filter': filter
        };
        Rest.browse.save(searchObj, function (data) {
          data = filterSelf(data);
          vm.searchChildrenData = data;
        }, function (error) {
          console.log('error', error);
        });
      }
    };

    vm.getPaternalGrandFatherInformation = function () {
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
        //get grand father
        Rest.browse.save(searchObj, function (data) {
          data = data.page.totalElements === 1 ? data._embedded.personList[0] : {};
          if (data.fatherFirstName && data.fatherMiddleName && data.fatherLastName) {
            //data = filterSelf(data);
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
              data = filterSelf(data);
              vm.searchDataPaternalGrandFather = data;
            }, function (error) {
              console.log('error', error);
            });
          }
        }, function (error) {
          console.log('error', error);
        });
      }
    };


    vm.getPaternalGrandMotherInformation = function () {
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
        //get grand mother
        Rest.browse.save(searchObj, function (data) {
          data = data.page.totalElements === 1 ? data._embedded.personList[0] : {};
          if (data.motherFirstName && data.motherMiddleName && data.motherLastName) {
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
              data = filterSelf(data);
              vm.searchDataPaternalGrandMother = data;
            }, function (error) {
              console.log('error', error);
            });
          }
        }, function (error) {
          console.log('error', error);
        });
      }
    };

    //Sibling
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
            if (data.page.totalElements === 1) {
              data = data._embedded.personList[0];
              if (data.fatherFirstName && data.fatherMiddleName && data.fatherLastName) {
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
                  data = filterSelf(data);
                  vm.searchDataPaternal = data;
                }, function (error) {
                  console.log('error', error);
                });
              } else {
                var dataF = {};
                dataF._embedded = {};
                dataF._embedded.personList = [];
                dataF._embedded.personList.push(data);
                vm.searchDataPaternal = dataF;
              }
            }
          },
          function (error) {
            console.log('error', error);
          });
      }
    };

    vm.getMaternalUncleInformation = function () {
      if (vm.profile.motherFirstName && vm.profile.motherMiddleName && vm.profile.motherLastName) {
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
        motherLastQuery.value = vm.profile.motherLastName;

        filter.push(motherFirstQuery);
        filter.push(motherMiddleQuery);
        filter.push(motherLastQuery);


        var searchObj = {
          'filter': filter
        };
        Rest.browse.save(searchObj, function (data) {
          data = data.page.totalElements === 1 ? data._embedded.personList[0] : {};
          if (data.fatherFirstName && data.fatherMiddleName && data.fatherLastName) {
            //data = filterSelf(data);
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
              //data = filterSelf(data);
              vm.searchDatMaternalGrandFather = data;
            }, function (error) {
              console.log('error', error);
            });
          }
        }, function (error) {
          console.log('error', error);
        });

        Rest.browse.save(searchObj, function (data) {
          data = data.page.totalElements === 1 ? data._embedded.personList[0] : {};
          if (data.motherFirstName && data.motherMiddleName && data.motherLastName) {
            //data = filterSelf(data);
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
              data = filterSelf(data);
              vm.searchDataMaternalGrandMother = data;
            }, function (error) {
              console.log('error', error);
            });
          }
        }, function (error) {
          console.log('error', error);
        });

        Rest.browse.save(searchObj, function (data) {
          if (data.page.totalElements === 1) {
            data = data._embedded.personList[0];
            if (data.fatherFirstName && data.fatherMiddleName && data.fatherLastName) {
              //data = filterSelf(data);
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
                data = filterSelf(data);
                vm.searchDataMaternal = data;
              }, function (error) {
                console.log('error', error);
              });
            } else {
              var dataF = {};
              dataF._embedded = {};
              dataF._embedded.personList = [];
              dataF._embedded.personList.push(data);
              vm.searchDataMaternal = dataF;
            }
          }
        }, function (error) {
          console.log('error', error);
        });
      }
    };
  }]);
