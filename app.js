var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tripsRouter = require('./routes/trips')
var cartItemsRouter = require('./routes/cartItems')
var bookingsRouter = require('./routes/bookings')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trips', tripsRouter)
app.use('/cartItems', cartItemsRouter)
app.use('/bookings', bookingsRouter)

module.exports = app;
