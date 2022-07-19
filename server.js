const { app } = require('./app');
const { db } = require('./utils/database.utils');
const { relationsBetweenModels } = require('./models/initModels');

db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch(() => console.log('Database error'));

relationsBetweenModels();

db.sync()
    .then(() => console.log('Database sync'))
    .catch(() => console.log('Database sync error'));

app.listen(4000, () => {
    console.log('Is alive!!');
});
