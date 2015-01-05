'use strict';

angular.module('products').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products','Categories',
	function($scope, $stateParams, $location, Authentication, Products, Categories) {
		$scope.authentication = Authentication;
		$scope.categories = Categories.query();
		$scope.category = $scope.categories[0]	
		$scope.create = function() {
			var product = new Products({
				title: this.title,
				category: this.category,
				pricing: { retail: this.price } 
				//add the rest of the form data
			});
			product.$save(function(response) {
				$location.path('products/' + response._id);
				$scope.title = '';
				$scope.category = '';
				$scope.retail = '';
				//add the rest of the form data
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(product) {
			if (product) {
				product.$remove();

				for (var i in $scope.products) {
					if ($scope.products[i] === product) {
						$scope.products.splice(i, 1);
					}
				}
			} else {
				$scope.product.$remove(function() {
					$location.path('products');
				});
			}
		};

		$scope.update = function() {
			var product = $scope.product;

			product.$update(function() {
				$location.path('products/' + product._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.products = Products.query();
		};

		$scope.findOne = function() {
			$scope.product = Products.get({
				productId: $stateParams.productId
			});
		};
	}
]);


angular.module('products').controller('CategoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Categories',
	function($scope, $stateParams, $location, Authentication, Categories) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var category = new Categories({
				title: this.title,
				description: this.description
			});
			category.$save(function(response) {
				$location.path('categories/');
				//add the rest of the form data
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		$scope.find = function() {
			$scope.products = Categories.query();
		};

	
	}
]);