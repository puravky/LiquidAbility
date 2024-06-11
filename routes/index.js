const express = require('express');
const router = express.Router();
const isLogin = require('../utils/isLogin');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/shop', (req, res) => {
    res.render('shop');
});

module.exports = router;