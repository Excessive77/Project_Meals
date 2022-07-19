const express = require('express');

//Controllers
const {
    getAllRestaurants,
    createRestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/restaurant.controller');

//Middlewares
const { restaurantExists } = require('../middlewares/restaurant.middleware');
const {
    createRestaurantValidator,
} = require('../middlewares/validators.middleware');
const {
    protectSession,
    protectUserAccount,
} = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/admin.middlware');
const { reviewExists } = require('../middlewares/review.middleware');

const restaurantsRouter = express.Router();

restaurantsRouter.get('/', getAllRestaurants);
restaurantsRouter.get('/', restaurantExists, getRestaurantById);

restaurantsRouter.use(protectSession);

restaurantsRouter.post('/', createRestaurantValidator, createRestaurant);

restaurantsRouter
    .use('/:id', isAdmin, restaurantExists)
    .route('/:id')
    .patch(updateRestaurant)
    .delete(deleteRestaurant);

restaurantsRouter.post(
    '/reviews/:restaurantId',
    restaurantExists,
    createReview
);

restaurantsRouter
    .use('/reviews/:id', protectUserAccount, reviewExists)
    .route('/reviews/:id')
    .get(getRestaurantById)
    .patch(updateReview)
    .delete(deleteReview);

module.exports = { restaurantsRouter };
