'use strict';

//Products service used for communicating with the product REST endpoints
angular.module('products').factory('Products', ['$resource',
	function($resource) {
		return $resource('products/:productId', {
			productId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

