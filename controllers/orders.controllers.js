//Models
const { Order } = require('../models/order.model'); //

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/AppError.utils');

const createOrder = catchAsync(async () => {
    const { mealId, quantity } = req.body;
    const { price } = req.meal;
    const { id } = req.user;

    const newOrder = await createOrder.create({
        userId: id,
        mealId,
        quantity,
        totalPrice: price * quantity,
    });

    res.status(200).json({
        status: 'success',
        newOrder,
    });
});

const getUserOrders = catchAsync(async (req, res, next) => {
    const { orders } = req;

    res.status(200).json({
        status: 'success',
        orders,
    });
});

const orderCompleted = catchAsync(async (req, res, next) => {
    const { id } = req;

    await Order.update(
        {
            status: 'completed',
        },
        {
            where: { id },
        }
    );

    res.status(200).json({
        status: 'success',
    });
});

const orderCancelled = catchAsync(async (req, res, next) => {
    const { id } = req.order;

    await Order.update(
        {
            status: 'cancelled',
        },
        {
            where: { id },
        }
    );

    res.status(200).json({
        status: 'success',
    });
});

module.exports = {
    createOrder,
    getUserOrders,
    getUserOrders,
    orderCompleted,
    orderCancelled,
};
