const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/products', adminController.getProducts);

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', 
    [
        body('title').isString().isLength({ min: 5 }).trim(),
        body('price').isFloat(),
        body('description').isString().isLength({ min: 5, max: 400 }).trim()
    ],
    adminController.postAddProduct
);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.delete('/product/:productId', adminController.deleteProduct);

module.exports = router;