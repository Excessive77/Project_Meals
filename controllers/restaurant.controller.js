//models
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/AppError.utils');
const { sorting } = require('../utils/sorting.utils');

const getAllRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = await Restaurant.findAll({
        where: { status: 'active' },
    });

    res.status(200).json({
        status: 'success',
        restaurants,
    });
});

const createRestaurant = catchAsync(async (req, res, next) => {
    const { name, address, rating } = req.body;
    // const { sessionUser } = req;

    const newRestaurant = await Restaurant.create({
        name,
        address,
        rating,
        // userId: sessionUser.id,
    });

    res.status(200).json({
        status: 'success',
        newRestaurant,
    });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    res.status(200).json({
        status: 'success',
        restaurant,
    });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { name, address } = req.body;

    await restaurant.update({ name, address });

    res.status(204).json({ status: 'success' });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    await restaurant.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

const createReview = catchAsync(async (req, res, next) => {
    const { comment, rating } = req.body;
    const { restaurantId, user } = req;

    const newReview = await Review.create({
        userId: user.id,
        restaurantId,
        comment,
        rating,
    });

    const reviews = await Review.findAll({
        where: {
            restaurantId,
        },
    });

    const arrayRatings = reviews.map(review => review.rating);
    const value = sorting(arrayRatings);

    await Restaurant.update(
        {
            rating: value,
        },
        {
            where: { id: restaurantId },
        }
    );

    res.status(201).json({
        status: 'success',
        newReview,
    });
});

const updateReview = catchAsync(async (req, res, next) => {
    const { review } = req;
    const { comment, rating } = req.body;

    await review.update({ comment, rating });

    res.status(204).json({ status: 'success' });
});

const deleteReview = catchAsync(async (req, res, next) => {
    const { review } = req;

    await review.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

module.exports = {
    getAllRestaurants,
    createRestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview,
};
