'use strict';

/**
 * @ngdoc function
 * @name samajPortalApp.controller:BrowseCtrl
 * @description
 * # AboutCtrl
 * Controller of the samajPortalApp
 */
angular.module('samajPortalApp')
  .controller('BrowseCtrl', ['rest', function (Rest) {
    var vm = this;
    vm.search=[];
    var searchKeys=[];

    searchKeys[0]='firstName';
    searchKeys[1]='middleName';
    searchKeys[2]='lastName';
    
    searchKeys[3]='email';
    searchKeys[4]='mobileNo';
    searchKeys[5]='gender';
    
    searchKeys[6]='maritalStatus';
    searchKeys[7]='familyType';
    searchKeys[8]='placeOfBirth';
    
    searchKeys[9]='height';
    searchKeys[10]='weight';
    searchKeys[11]='highestQualication';
    
    searchKeys[12]='detailsOfService';
    searchKeys[13]='designationInService';
    searchKeys[14]='detailsOfBusiness';
    
    searchKeys[15]='fatherFirstName';
    searchKeys[16]='fatherMiddleName';
    searchKeys[17]='fatherLastName';
    
    searchKeys[18]='motherFirstName';
    searchKeys[19]='motherMiddleName';
    searchKeys[20]='motherLastName';
    
    searchKeys[21]='sangh';
    searchKeys[22]='expertise';

    searchKeys[23]='bloodGroup';
    searchKeys[24]='vadhuVarMelava';
    for(var i=0;i<searchKeys.length;i++){
        vm.search[i]={};
        vm.search[i].key=searchKeys[i];
    }
    
    vm.searchRecord = function () {
      var searchObj={'filter':vm.search};
      Rest.browse.save(searchObj, function (data) {
        vm.searchData=data;
        vm.pageNumbers=[];
        for(var j=0;j<data.page.totalPages;j++){
            vm.pageNumbers[j]=j;
        }
        console.log('data',data);
      }, function (error) {
        console.log('error',error);
      });
    };
    vm.all = function () {
        /*Rest.browseAll.get( function (data) {
          vm.searchData=data;
          vm.pageNumbers=[];
          for(var j=0;j<data.page.totalPages;j++){
              vm.pageNumbers[j]=j;
          }
          console.log('data',data);
        }, function (error) {
          console.log('error',error);
          vm.searchData={};
        });*/
        var searchObj={'filter':[]};
        Rest.browse.save(searchObj, function (data) {
          vm.searchData=data;
          vm.pageNumbers=[];
          for(var j=0;j<data.page.totalPages;j++){
              vm.pageNumbers[j]=j;
          }
          console.log('data',data);
        }, function (error) {
          console.log('error',error);
        });
    };

    vm.reset = function () {
        vm.search={};
    };

    vm.paginate = function (pageNumber) {
      var searchObj={'filter':vm.search};
      //searchObj.page=pageNumber;
      //searchObj.size=20;
      Rest.browse.save( {'page':pageNumber,'size':20 },searchObj,function (data) {
        vm.searchData=data;
        vm.pageNumbers=[];
        for(var j=0;j<data.page.totalPages;j++){
            vm.pageNumbers[j]=j;
        }
        console.log('data',data);
      }, function (error) {
        console.log('error',error);
      });
    };

  }]);
/*

vm={
  validate:function(){},
  isEmailEmpty:true
}
*/
