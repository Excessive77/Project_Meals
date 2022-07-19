const { body, validationResult } = require('express-validator');

//Utils
const { AppError } = require('../utils/AppError.utils');

const checkResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //Array has errors
        const errorMsgs = errors.array().map(err => err.msg);
        const message = errorMsgs.join('. ');

        return next(new AppError(message, 400));
    }

    next();
};

const createUserValidator = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isLength({ min: 8, max: 12 })
        .withMessage('Password must be at least 8 characters long')
        .isAlphanumeric()
        .withMessage('Password must contain letters and numbers'),
    checkResult,
];

const createRestaurantValidator = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('address').notEmpty().withMessage('Address cannot be empty'),
    body('rating').notEmpty().withMessage('Rating cannot be empty'),
    checkResult,
];

const createMealsValidators = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('price').notEmpty().withMessage('Price must be a number'),
];

module.exports = {
    createUserValidator,
    createRestaurantValidator,
    createMealsValidators,
};
