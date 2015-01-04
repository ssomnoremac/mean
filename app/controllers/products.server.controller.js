'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Product = mongoose.model('Product'),
	_ = require('lodash');

/**
 * Create a Product
 */
exports.create = function(req, res) {
	var product = new Product(req.body);

	product.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(product);
		}
	});
};

/**
 * View current product
 */
exports.view = function(req, res) {
	res.json(req.product);
};

/**
 * Update a product
 */
exports.update = function(req, res) {
	var product = req.product;

	product = _.extend(product, req.body);

	product.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(product);
		}
	});
};

/**
 * Delete an product
 */
exports.delete = function(req, res) {
	var product = req.product;

	product.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(product);
		}
	});
};

/**
 * List of products
 */
exports.list = function(req, res) {
	Product.find().sort('-created')
		.exec(function(err, products) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(products);
		}
	});
};

/**
 * product middleware
 */
exports.productByID = function(req, res, next, id) {
	Product.findById(id)
		.exec(function(err, product) {
		if (err) return next(err);
		if (!product) return next(new Error('Failed to load product ' + id));
		req.product = product;
		next();
	});
};

/**
 * product authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if ((req.user.roles).indexOf('admin') == -1) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};