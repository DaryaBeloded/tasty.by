const express = require('express');
const app = express();
const db = require ('./db');
const cors = require('cors');

const AuthController = require('./routes/AuthController');
const CuisineController = require('./routes/CuisineController');
const CategoryController = require('./routes/CategoryController');
const DishController = require('./routes/DishController');
const CafeController = require('./routes/CafeController');
const FavoriteController = require('./routes/FavoriteController');
const OrderController = require('./routes/OrderController');
const RatingController = require('./routes/RatingController');

app.use(cors());

app.use(express.static(require('path').join(__dirname,'/public')));

// app.use ('/top1', DishController);

app.use('/orders', OrderController);

app.use('/auth', AuthController);

// для заполнения БД
// app.use('/add', CuisineController);
// app.use('/add', CategoryController);
// app.use('/add', DishController);

app.use('/rating', RatingController);
app.use('/favorites', FavoriteController);

app.use('/cafes', CafeController);
app.use('/categories', CategoryController);
app.use('/cuisines', CuisineController);
app.use('/dishes', DishController);

app.use('/privateOffice', FavoriteController);
app.use('/privateOffice', AuthController);

module.exports = app;
