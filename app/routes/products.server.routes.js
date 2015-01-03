'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	products = require('../../app/controllers/products.server.controller');

module.exports = function(app) {
	// Product Routes
	app.route('/products')
		.get(products.list)
		.post(users.requiresLogin, products.create); // products.hasAuthorization removed

	app.route('/products/:productId')
		.get(products.view)
		.put(users.requiresLogin, products.update) // products.hasAuthorization, removed
		.delete(users.requiresLogin, products.delete); // products.hasAuthorization removed

	// Finish by binding the article middleware
	app.param('productId', products.productByID);
};