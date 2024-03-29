const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/AppError.utils');

dotenv.config({ path: './config.env' });

const protectSession = catchAsync(async (req, res, next) => {
    let token;

    // Extract the token from headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Invalid session', 403));
    }

    // Ask JWT (library), if the token is still valid
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // { id, ... }

    // Check in db that user still exists
    const user = await User.findOne({
        where: { id: decoded.id, status: 'active' },
    });

    if (!user) {
        return next(
            new AppError('The owner of this token does not exist anymore', 403)
        );
    }

    // Grant access
    req.sessionUser = user;
    next();
});

const protectUserAccount = (req, res, next) => {
    // const { id } = req.params -> Alternative
    const { sessionUser, user } = req;

    // If the id's don't match, return error (403)
    if (sessionUser.id !== user.id) {
        return next(new AppError('You are not own of this account', 403));
    }

    next();
};

module.exports = { protectSession, protectUserAccount };
