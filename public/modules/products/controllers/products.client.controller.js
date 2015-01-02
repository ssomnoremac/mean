'use strict';

angular.module('products').controller('ProductController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products',
	function($scope, $stateParams, $location, Authentication, Products) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var product = new Products({
				title: this.title,
				//add the rest of the form data
			});
			product.$save(function(response) {
				$location.path('products/' + response._id);

				$scope.title = '';
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
			$scope.articles = Products.query();
		};

		$scope.findOne = function() {
			$scope.product = Products.get({
				productId: $stateParams.productId
			});
		};
	}
]);