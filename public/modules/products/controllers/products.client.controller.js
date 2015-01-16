'use strict';

angular.module('products').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products','Categories',
	function($scope, $stateParams, $location, Authentication, Products, Categories) {
		$scope.authentication = Authentication;
		var position_array = [];
		$scope.products = Products.query(function(products){
			if (products.length > 0){
				products.forEach(function(p){
					position_array.push(p.position);
				});
				position_array.sort();
			}
		});
		$scope.categories = Categories.query(function(categories){
			if (categories.length < 1) {
				$scope.show_input = true;
			}
			else{
				$scope.show_input = false;
				$scope.default_category = categories[0];
			}
		});
		$scope.$watch('selected_category',function(v){
			for (var i in $scope.categories) {
				var category = $scope.categories[i];
				if (category == v) {
					$scope.selected_category = category;
					break;
				}
			}
			
		});
		$scope.create = function() {
			var product = new Products({
				title: this.title,
				category: $scope.selected_category,
				pricing: { retail: this.price },
				position: Math.max.apply(Math, position_array) + 1
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
			$scope.categories = Categories.query()
		};

		$scope.findOne = function() {
			$scope.product = Products.get({
				productId: $stateParams.productId
			});
		};
	}
]);

