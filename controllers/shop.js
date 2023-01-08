const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.render('shop/products', {
            prods: products,
            pageTitle: 'Product List',
            path: '/products'
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getProduct = (req, res, next) => {

};

exports.getIndex = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.render('shop/products', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getCart = (req, res, next) => {

};

exports.postCart = (req, res, next) => {

};

exports.postCartDeleteProduct = (req, res, next) => {

};

exports.getCheckout = (req, res, next) => {

};

exports.getCheckoutSuccess = (req, res, next) => {

};

exports.getOrders = (req, res, next) => {

};

exports.getInvoice = (req, res, next) => {

};