const express = require('express');

//Controllers
const {
    createUser,
    updateUser,
    deleteUser,
    login,
    getUserOrder,
    getUsersOrders,
} = require('../controllers/users.controller');

//Middlewares
const { createUserValidator } = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');
const {
    protectSession,
    protectUserAccount,
} = require('../middlewares/auth.middleware');
const {
    orderExists,
    ordersExists,
} = require('../middlewares/order.middleware');

const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidator, createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/orders', ordersExists, getUsersOrders);
usersRouter.get('/orders/:id', orderExists, getUserOrder);

usersRouter
    .use('/:id', userExists, protectUserAccount)
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser);

module.exports = { usersRouter };
