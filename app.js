const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');

const database = require('./config/connection');

const adminRouter = require('./routes/adminRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index');
 
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(
    expressSession(
        {
            secret: process.env.SESSION_KEY,
            resave: false,
            saveUninitialized: false
        })
)
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/admin', adminRouter)

app.listen(3000);