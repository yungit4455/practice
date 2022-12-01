const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login'
    });
};

exports.postLogin = (req, res, next) => {

};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Signup',
        path: '/signup'
    });
};


exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const passowrd = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/signup', {
            pageTitle: 'Signup',
            path: '/signup'
        });
    }

    res.redirect('/');
};