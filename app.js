const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const MONGODB = require('./config/db.json').MONGO_URL;

const adminRoutes = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Allow-Control-Allow-Origin', '*');
    res.setHeader('Allow-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Allow-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/admin', adminRoutes);

mongoose.connect(MONGODB)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));