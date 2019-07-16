const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RestaurantSchema = new Schema({
    name: String,
    location: String,
    avarage: Number,
    reviews: [{
        userName: String,
        bathroomRate: Number,
        cleanRate: Number,
        staffRate: Number,
        driveRate: Number,
        deliveryRate: Number,
        foodRate: Number,
        pic: String, //TODO
        date: Date
    }
    ]
});

module.exports = Restaurant = mongoose.model('restaurants', RestaurantSchema);
