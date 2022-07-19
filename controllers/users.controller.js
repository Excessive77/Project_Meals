const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config({ path: './config.env' });

//models
const { User } = require('../models/user.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/AppError.utils');

const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    //Hashing his password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        newUser,
    });
});

const updateUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { name, email } = req.body;

    await user.update({ name, email });

    res.status(204).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;

    await user.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //Validate email
    const user = await User.findOne({
        where: {
            email,
            status: 'active',
        },
    });

    if (!user) {
        return next(new AppError('Invalid username or password', 400));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return next(new AppError('Invalid username or password', 400));
    }

    //Generate JWT (Json Web Token)
    //Generate JWT_SIGN = node -> require('crypto').randomBytes(64).toString('hex')
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '5m',
    });

    //Send response
    res.status(200).json({
        status: 'ok',
        token,
    });
});

const getUsersOrders = catchAsync(async (req, res, next) => {
    const { orders } = req;

    res.status(200).json({ status: 'success', orders });
});

const getUserOrder = catchAsync(async (req, res, next) => {
    const { order } = req;

    res.status(200).json({ status: 'success', order });
});

module.exports = {
    createUser,
    login,
    updateUser,
    deleteUser,
    getUsersOrders,
    getUserOrder,
};
