const express = require('express');
const router = express.Router();
// const auth = require('../../middleware/auth'); //TODO

// Rest Model
const Restaurant = require('../model/restaurants');

// @route   GET api/restaurants
// @desc    Get All rests
// @access  Public
router.get('/', (req, res) => {
    Restaurant.find()
        .sort({average: -1})
        .then(restaurants => res.json(restaurants));
});

// @route   POST api/restaurants
// @desc    Create a rest
// @access  Private
router.post('/', (req, res) => {
    const { name, location}  = req.params;
    // console.log(` req.body = ${req.params} `);
    console.log(` name = ${name}  ;  location = ${location}`);
    // Simple validation
    if (!name || !location) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }
    //create element to insert
    const newRestaurant = new Restaurant({
        name,
        location
    });

    newRestaurant.save().then(restaurants => res.json(restaurants));
});

// @route   DELETE api/restaurants/:id
// @desc    Delete A rest
// @access  Private
router.delete('/:_id', (req, res) => {
    Restaurant.findById(req.params._id)
        .then(rest => rest.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
