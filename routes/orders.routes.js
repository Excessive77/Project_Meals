const express = require('express');

//Controllers
const {
    createOrder,
    getUserOrders,
    orderCancelled,
    orderCompleted,
} = require('../controllers/orders.controllers');

//Middelwares
const { protectSession } = require('../middlewares/auth.middleware');
const { mealExists } = require('../middlewares/meal.middleware');
const {
    orderExists,
    ordersExists,
} = require('../middlewares/order.middleware');

const ordersRouter = express.Router();

ordersRouter.use(protectSession);

ordersRouter.post('/', mealExists, createOrder);

ordersRouter.get('/me', ordersExists, getUserOrders);

ordersRouter
    .use('/:id', orderExists)
    .route('/:id')
    .patch(orderCompleted)
    .delete(orderCancelled);

module.exports = { ordersRouter };
