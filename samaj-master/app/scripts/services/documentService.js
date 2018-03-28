'use strict';
angular.module('samajPortalApp').factory('docService', ['$http', '$q', 'urls', '$location', function ($http, $q, urls, $location) {
  var urlBase = $location.protocol() + '://' + $location.host() + ':' + $location.port();
  if ($location.port() === 9000) {
    urlBase = $location.protocol() + '://' + $location.host() + ':8080';
    //urlBase = 'http://10.108.64.119:8070';
  }

  function saveDoc(file, id) {
    var deferred = $q.defer();
    var formData = new FormData();
    formData.append('file', file);

    if (id) {
      $http.post(urlBase + '/doc/upload/' + id, formData, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        })
        .then(
          function (response) {
            deferred.resolve(response.data);
          },
          function (errResponse) {
            window.alert(errResponse.data.errorMessage);
            deferred.reject(errResponse);
          }
        );
    } else {
      $http.post(urlBase + '/doc/upload', formData, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        })
        .then(
          function (response) {
            deferred.resolve(response.data);
          },
          function (errResponse) {
            window.alert('errResponse',errResponse);
            deferred.reject(errResponse);
          }
        );
    }
    return deferred.promise;
  }

  function findDoc(docId) {
    var deferred = $q.defer();
    $http.get(urls.DOC_URL + '/' + docId)
      .then(
        function (response) {
          deferred.resolve(response.data);
        },
        function (errResponse) {
          window.alert('errResponse',errResponse);
          deferred.reject(errResponse);
        }
      );
    return deferred.promise;
  }
  var factory = {
    saveDoc: saveDoc,
    findDoc: findDoc
  };

  return factory;


}]);
