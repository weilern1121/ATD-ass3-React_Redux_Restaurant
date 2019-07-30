const express = require('express');
const router = express.Router();
const Rest = require('../model/restaurants');


// @route   POST api/reviewsPage
// @desc    Create a review
// @access  Private
router.post('/reviewsByRest', (req, res) => {
    const { restName}  = req.body;
    // Simple validation
    if (!restName) {
        console.log('!restName');
        Rest.find()
            .then(results => {
                    return res.json(results);
                }
            )

        // return res.status(400).json({msg: 'restName is null!'});
    } else {
        Rest.findOne({name: restName})
            .then(results => {
                    return res.json(results.reviews);
                }
            )
            .catch(err => console.log(err));
    }
    // newReview.save().then(reviews => res.json(reviews));
});

// @route   POST api/reviewsPage
// @desc    Create a review
// @access  Private
router.post('/reviewsByUser', (req, res) => {
    const { name }  = req.body;
    console.log('/reviewsByUser: ');
    // Simple validation

        // return res.status(400).json({msg: 'restName is null!'});
    Rest.find({})
        .then(rests => {
            let filteredRests = rests.map((rest => {
                let filteredRevs = rest.reviews.filter((rev => {
                    return rev.userName === name;
                }));
                return {
                    name: rest.name,
                    location: rest.location,
                    reviews: filteredRevs
                }
                }));
            filteredRests = filteredRests.filter(rest => rest.reviews.length > 0);

            return res.json({
                userName: name,
                reviews: filteredRests});
        })
        .catch(err => console.log(err));
});

module.exports = router;
