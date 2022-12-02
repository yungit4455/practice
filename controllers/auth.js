const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        oldInput: {
            email: '',
            password: ''
        }
    });
};

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('auth/login', {
           pageTitle: 'Login',
           path: '/login',
           oldInput: {
                email: email,
                password: ''
           }
        });
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log('invalid email or password');
            return res.render('auth/login', {
                pageTitle: 'Login',
                path: '/login',
                oldInput: {
                     email: email,
                     password: ''
                }
             });
        } else {
            const doMatch = await bcrypt.compare(password, user.password);
            if (doMatch) {
                console.log('Login Success');
                return res.redirect('/');
            } else {
                console.log('invalid email or password');
                return res.render('auth/login', {
                    pageTitle: 'Login',
                    path: '/login',
                    oldInput: {
                         email: email,
                         password: ''
                    }
                 });
            }
        }
    } catch (err) {
        console.log(err);
    } 
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Signup',
        path: '/signup',
        oldInput: {
            email: '',
            password: ''
        }
    });
};


exports.postSignup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/signup', {
            pageTitle: 'Signup',
            path: '/signup',
            oldInput: {
                email: email,
                password: password
            }
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
        });
        await user.save();
        console.log('Created New User');
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};