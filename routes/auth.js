const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);

router.post('/signup', 
    [
        check('email')
            .isEmail()
            .custom(async (value, {req}) => {
                try {
                    const userDoc = await User.findOne({ email: value });
                    if (userDoc) {
                        return Promise.reject('E-mail exists already, please pick a different one.');
                    }
                } catch (err) {
                    console.log(err);
                }
            })
            .normalizeEmail(),
        body('password').trim().isLength({ min: 5 }).isAlphanumeric(),
        body('confirmPassword').trim().custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match.');
            }
            return true;
        })
    ],
    authController.postSignup
);

router.post('/logout', isAuth, authController.postLogout);

module.exports = router;