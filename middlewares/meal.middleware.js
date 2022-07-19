//Models
const { Meal } = require('../models/meal.model'); //

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/AppError.utils');
const { Restaurant } = require('../models/restaurant.model');

const mealExists = catchAsync(async () => {
    const { id } = req.params;

    const meal = await Meal.findOne({
        where: { id, status: 'active' },
        include: { model: Restaurant },
    });

    if (!meal) {
        return next(new AppError('Meal not found', 404));
    }

    req.meal = meal;
    next();
});

module.exports = { mealExists };
