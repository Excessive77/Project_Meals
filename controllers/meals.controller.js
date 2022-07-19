//Models
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/AppError.utils');

const createMealIntoRestaurant = catchAsync(async (req, res, next) => {
    const { name, price, restaurantId } = req.body;

    const newMeal = await Meal.create({
        name,
        price,
        restaurantId,
    });

    res.status(201).json({
        status: 'success',
        newMeal,
    });
});

const getAllMeals = catchAsync(async (req, res, next) => {
    const meals = await Meal.findAll({
        where: { status: 'active' },
        include: { model: Restaurant },
    });

    res.status(200).json({
        status: 'success',
        meals,
    });
});

const getMealById = catchAsync(async (req, res, next) => {
    const { meal } = req;

    res.status(200).json({
        status: 'success',
        meal,
    });
});

const updateMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;
    const { name, price } = req.body;

    await meal.update({ name, price });

    res.status(204).json({ status: 'success' });
});

const deleteMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;

    await meal.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

module.exports = {
    createMealIntoRestaurant,
    getAllMeals,
    getMealById,
    updateMeal,
    deleteMeal,
};
