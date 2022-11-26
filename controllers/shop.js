const Product = require('../models/products');

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