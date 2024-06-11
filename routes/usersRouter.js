const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
router.get('/', (_req, res) => {
    res.send("working")
});

router.post('/register', async (req, res) => {
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({email});
    if (user) return res.status(400).send("User already registered !");
    else return res.status(200).send("Registered successfully, Now you can login!")

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            if (err) return res.send(500, err.message);
            else {
                let user = await userModel.create({ fullname, email, password: hash });
                let token = jwt.sign({ email, id: user._id }, process.env.JWT_KEY);
                res.cookie("token", token);
            }
        });
    })
});
router.post('/login', async (req, res) => {
    let { email, password } = req.body;

    let user = await userModel.findOne({email});
    if (!user) return res.status(404).send("Email doesn't exist !");

    bcrypt.compare(password, user.password, async function (err, result) {
        if (err) return res.send(500, err.message);
        if (result) {
            let token = jwt.sign({ email, id: user._id }, process.env.JWT_KEY);
            res.cookie("token", token);
            res.status(200);
            res.redirect('/shop');
        }
        else return res.status(400).send("Incorrect password!");
    });
});

module.exports = router;
