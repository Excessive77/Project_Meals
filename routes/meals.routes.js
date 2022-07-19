const express = require('express');

//Controllers
const {
    createMealIntoRestaurant,
    getAllMeals,
    getMealById,
    updateMeal,
    deleteMeal,
} = require('../controllers/meals.controller');

//Middlewares
const { mealExists } = require('../middlewares/meal.middleware');
const { protectSession } = require('../middlewares/auth.middleware');
const { restaurantExists } = require('../middlewares/restaurant.middleware');
const { isAdmin } = require('../middlewares/admin.middlware');
const {
    createMealsValidators,
} = require('../middlewares/validators.middleware');

const mealsRouter = express.Router();

mealsRouter.post(
    '/:id',
    restaurantExists,
    createMealsValidators,
    createMealIntoRestaurant
);

mealsRouter.get('/', getAllMeals);

mealsRouter.get('/:id', mealExists, getMealById);

mealsRouter.use(protectSession);

mealsRouter
    .use('/:id', mealExists, isAdmin)
    .route('/:id')
    .patch(updateMeal)
    .delete(deleteMeal);

module.exports = { mealsRouter };
