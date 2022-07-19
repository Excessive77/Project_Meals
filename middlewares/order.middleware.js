//Models
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');
const { Meal } = require('../models/meal.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/AppError.utils');

const orderExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;

    const order = await Order.findOne({
        where: {
            id,
            userId: user.id,
            status: 'active',
        },
        include: {
            model: Meal,
            attributes: { exclude: ['createdAt', 'updatedAt', 'restaurantId'] },
            include: {
                model: Restaurant,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
        },
    });

    if (!order) {
        return next(new AppError('You do not have this order'));
    }

    req.order = order;
    next();
});

const ordersExists = catchAsync(async (req, res, next) => {
    const { id } = req.user;

    const orders = await Order.findAll({
        where: {
            userId: id,
        },
        include: {
            model: Meal,
            attributes: { exclude: ['createdAt', 'updatedAt', 'restaurantId'] },
            include: {
                model: Restaurant,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
        },
    });

    if (!orders) {
        return next(new AppError('You do not have this orders'));
    }

    req.orders = orders;
    next();
});

module.exports = { orderExists, ordersExists };
