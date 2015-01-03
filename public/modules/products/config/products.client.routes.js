'use strict';
'use strict';

// Setting up route
angular.module('products').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('listProducts', {
			url: '/products',
			templateUrl: 'modules/products/views/list-product.client.view.html'
		}).
		state('createproduct', {
			url: '/products/create',
			templateUrl: 'modules/products/views/create-product.client.view.html'
		}).
		state('viewproduct', {
			url: '/products/:productId',
			templateUrl: 'modules/products/views/view-product.client.view.html'
		}).
		state('editproduct', {
			url: '/products/:productId/edit',
			templateUrl: 'modules/products/views/edit-product.client.view.html'
		});
	}
]);