const mongoose = require('mongoose');

const Product = require('../models/products');

exports.getProducts = async (req, res, next) => {
    try {
        // 테스트용 더미 product 생성
        // const product = new Product({
        //     title: 'test',
        //     price: 12.99,
        //     description: 'TESTSSSSS',
        //     imageUrl: 'dads'
        // });
        // product.save().then((result) = console.log('Dumy Create'));
        const products = await Product.find();
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    } catch (err) {
        console.log(err);
    }
};

exports.addProduct = async (req, res, next) => {
    
};