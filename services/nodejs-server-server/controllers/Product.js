'use strict';

var url = require('url');

var Product = require('./ProductService');

module.exports.deleteProduct = function deleteProduct (req, res, next) {
  Product.deleteProduct(req.swagger.params, res, next);
};

module.exports.getProduct = function getProduct (req, res, next) {
  Product.getProduct(req.swagger.params, res, next);
};

module.exports.getProducts = function getProducts (req, res, next) {
  Product.getProducts(req.swagger.params, res, next);
};

module.exports.postProduct = function postProduct (req, res, next) {
  Product.postProduct(req.swagger.params, res, next);
};
