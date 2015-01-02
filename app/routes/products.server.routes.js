'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	products = require('../../app/controllers/products.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/products')
		.get(products.list)
		.post(users.requiresLogin, products.hasAuthorization, products.create);

	app.route('/products/:productId')
		.get(products.view)
		.put(users.requiresLogin, products.hasAuthorization, products.update)
		.delete(users.requiresLogin, products.hasAuthorization, products.delete);

	// Finish by binding the article middleware
	app.param('productId', products.articleByID);
};