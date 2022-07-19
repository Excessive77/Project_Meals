//Models
const { Restaurant } = require('../models/restaurant.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/AppError.utils');

const restaurantExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({ where: { id } });

    if (!restaurant) {
        return next(new AppError('Restaurant not found', 404));
    }

    req.restaurant = restaurant;
    next();
});

module.exports = { restaurantExists };
