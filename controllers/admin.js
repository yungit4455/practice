const path = require('path');
const fs = require('fs');

const Product = require('../models/products');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.render('admin/products', {
            prods: products,
            pageTitle: 'All Products',
            path: '/admin/products'
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = async (req, res, next) => {
    const title = req.body.title;
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;

    if (!image) {
        res.redirect('/admin/add-product');
    }
    const imageUrl = image.path;

    const product = new Product({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
    });
    try {
        await product.save();
        console.log('Created Product');
        res.redirect('/admin/products');
    } catch (err) {
        console.log(err);
    }
};

exports.getEditProduct = async (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    } catch (err) {
        console.log(err);
    }
};

exports.postEditProduct = async (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const image = req.file;

    try {
        const product = await Product.findById(productId);
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        if (image) {
            fs.unlink(product.imageUrl, (err) => {
                if (err) {
                    throw (err);
                }
            });
            product.imageUrl = image.path;
        }
        await product.save();
        console.log('Updated Product');
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};

exports.deleteProduct = async (req, res, next) => {

};