//Utils
const { catchAsync } = require('../utils/catchAsync.utils'); //
const { AppError } = require('../utils/AppError.utils'); //

const isAdmin = catchAsync(async (req, res, next) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return next(new AppError('You are not administrator'));
    }

    next();
});

module.exports = { isAdmin };
