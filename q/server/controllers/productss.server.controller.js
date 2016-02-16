var mongoose = require('mongoose');
var products = require('./../models/products.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  products.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.create = function(req, res) {
  var products = new products(req.body);
  products.user = req.user;
  products.save(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.read = function(req, res) {
  res.json(req.products);
};


exports.delete = function(req, res) {
	var products = req.products;
	products.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(products);
		}
	});
};


module.exports.update = function(req, res) {
  var products = req.products;

  	products = _.extend(products, req.body);

  	products.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(products);
  		}
  	});
};

exports.productsByID = function(req, res, next, id) {
	products.findById(id).populate('user', 'email').exec(function(err, products) {
		if (err) return next(err);
		if (!products) return next(new Error('Failed to load products ' + id));
		req.products = products;
		next();
	});
};
