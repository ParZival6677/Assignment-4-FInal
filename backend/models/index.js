// models/index.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Database connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

const db = {};
db.mongoose = mongoose;

db.users = require('./userModel');

module.exports = db;
