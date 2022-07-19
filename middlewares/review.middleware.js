//Models
const { Review } = require('../models/review.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/AppError.utils');

const reviewExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const review = await Review.findOne({ where: { id } });

    if (!review) {
        return next(new AppError('Review not found', 404));
    }

    req.review = review;
    next();
});

module.exports = { reviewExists };
