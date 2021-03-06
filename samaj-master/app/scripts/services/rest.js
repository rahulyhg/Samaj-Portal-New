(function () {
	'use strict';

	/**
	 * @ngdoc service
	 * @name samaj.rest
	 * @description
	 * # rest
	 * Service in the samaj.
	 */
	angular.module('samajPortalApp')
		.service('rest', ['$resource', '$location', function ($resource, $location) {

				var urlBase = $location.protocol() + '://' + $location.host() + ':' + $location.port();
			if ($location.port() === 9000) {
				urlBase = $location.protocol() + '://' + $location.host() + ':8080';
				//urlBase = 'http://10.108.64.119:8070';
			}
			if ($location.absUrl().substring(0, urlBase.length + 11) === urlBase + '/samaj') {
				urlBase += '/samaj';
			}
			
			// AngularJS will instantiate a singleton by calling "new" on this function
			return {
				login: $resource(urlBase + '/login',{},{
					save: {
						method: 'POST',
						transformResponse: function(data, headers){
							var response = {};
							response.data = data;
							response.headers = headers();
							return response;
						}
					}
				}),
				register: $resource(urlBase + '/samaj/register'),
				browse: $resource(urlBase + '/samaj/filter'),
				browseAll: $resource(urlBase + '/samaj/all'),
				changePassword: $resource(urlBase + '/samaj/changePassword'),
				profile: $resource(urlBase + '/samaj/profile/:id',{},{
					update:{
						method:'PUT'
					}
				}),
				document: $resource(urlBase + '/samaj/document/:id'),
				registerDocument: $resource(urlBase + '/samaj/document')
            };
		}]);
})();