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

angular.module('products').factory('Categories', ['$resource',
	function($resource) {
		return $resource('categories/:categoryId', {
			productId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);