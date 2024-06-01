const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    products: Array,
    picture: String
})

module.exports = mongoose.model('admin', adminSchema);