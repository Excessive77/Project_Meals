//Models
const { User } = require('../models/user.model');
const { Order } = require('../models/order.model');
const { Review } = require('../models/review.model');
const { Restaurant } = require('../models/restaurant.model');
const { Meal } = require('../models/meal.model');

const relationsBetweenModels = () => {
    User.hasMany(Order, { foreignKey: 'userId' });
    Order.belongsTo(User);

    User.hasMany(Review, { foreignKey: 'userId' });
    Review.belongsTo(User);

    Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
    Review.belongsTo(Restaurant);

    Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
    Meal.belongsTo(Restaurant);

    Meal.hasOne(Order, { foreignKey: 'mealId' });
    Order.belongsTo(Meal);
};

module.exports = { relationsBetweenModels };
