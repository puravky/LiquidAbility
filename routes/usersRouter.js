const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/user');

router.get('/', (req, res) => {
    res.send("working")
});

router.post('/register', async (req, res) => {
    let {fullname, email, password} = req.body;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            password =  hash;
            res.send(hash.toString());
        });
    })

//     let user = await userModel.create({fullname, email, password});
//     res.send(user);

// });

module.exports = router;
