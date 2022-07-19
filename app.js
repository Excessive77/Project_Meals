const express = require('express');

//Routes
const { usersRouter } = require('./routes/users.routes');
const { restaurantsRouter } = require('./routes/restaurants.routes');
const { mealsRouter } = require('./routes/meals.routes');
const { ordersRouter } = require('./routes/orders.routes');

//Global error handler
const { globalErrorHandler } = require('./controllers/error.controller');

//Utils
const { AppError } = require('./utils/AppError.utils');

//Init express app
const app = express();

//Enable incoming JSON
app.use(express.json());

//Fefine endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meals', mealsRouter);

app.all('*', (req, res, next) => {
    next(
        new AppError(
            `${req.method} ${req.originalUrl} not found on this server`,
            404
        )
    );
});

app.use(globalErrorHandler);

module.exports = { app };
