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
        path: '/admin/add-product'
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
    // const imageUrl = image.path

    const product = new Product({
        title: title,
        imageUrl: image,
        price: price,
        description: description
    });
    try {
        const result = await product.save();
        console.log('Created Product');
        res.redirect('/admin/products');
    } catch (err) {
        console.log(err);
    }
};

exports.getUpdateProduct = async (req, res, next) => {

};

exports.postUpdateProduct = async (req, res, next) => {

};

exports.deleteProduct = async (req, res, next) => {

};