const express = require('express');
const app = express();

const database = require('./config/connection');
const cookieParser = require('cookie-parser');

const adminRouter = require('./routes/adminRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/admin', adminRouter)

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.listen(3000);