'use strict';

/**
 * @ngdoc overview
 * @name samajPortalApp
 * @description
 * # samajPortalApp
 *
 * Main module of the application.
 */
angular
  .module('samajPortalApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMessages',
    'ngStorage'
  ]).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authenticationInterceptor');
  }]).factory('authenticationInterceptor', ['$q', '$rootScope', '$localStorage', function ($q, $rootScope, $localStorage) {
    return {
      request: function (config) {
        if ($localStorage.token) {
          config.headers.Authorization = $localStorage.token;
        }
        return config;
      },
      responseError: function (rejection) {
        console.debug('response-error', rejection);
        return $q.reject(rejection);
      }
    };
  }]).constant('urls', {
    DOC_URL: 'http://localhost:8080/doc/'
  }).directive('fileModel', [ '$parse', function($parse) {
    return {
        restrict : 'A',
        link : function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
} ]).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      }).when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      }).when('/register/:flag',{
        templateUrl: 'views/registration.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      }).when('/profile/:id',{
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      }).when('/browse',{
        templateUrl: 'views/browse.html',
        controller: 'BrowseCtrl',
        controllerAs: 'browse'
      })
      .when('/contacts',{
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl',
        controllerAs: 'contacts'
      })
      .when('/changePassword',{
        templateUrl: 'views/changePassword.html',
        controller: 'ChangePasswordCtrl',
        controllerAs: 'changePassword'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
