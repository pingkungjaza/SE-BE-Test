const mongoose = require('mongoose');
const { mongo } = require('../config');

const connectDB = async () => {
    try {
        mongoose.connect(mongo.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB