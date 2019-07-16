const express = require('express');
const router = express.Router();
const Rest = require('../model/restaurants');
// Review Model
// const Review = require('../model/review');

// @route   GET api/reviewsPage
// @desc    Get All reviews
// @access  Public
// router.get('/', (req, res) => {
//     Review.find()
//         .sort({date: -1})
//         .then(reviews => res.json(reviews));
// });
//
// // @route   POST api/reviewsPage
// // @desc    Create a review
// // @access  Private
// router.post('/', (req, res) => {
//     const { userName, restName, restLocation, bathroomRate, cleanRate, staffRate
//         , driveRate, deliveryRate, foodRate, pic, date}  = req.body;
//     // console.log(` req.body = ${req.body} `);
//     console.log('userName: ',userName,'restName: ',restName);
//     // Simple validation
//     if (!userName || !restName || !restLocation) {
//         return res.status(400).json({msg: 'Please enter all fields'});
//     }
//     //create element to insert
//     const newReview = new Review({
//         userName, restName, restLocation, bathroomRate, cleanRate, staffRate
//         , driveRate, deliveryRate, foodRate, pic, date
//     });
//
//     newReview.save().then(reviews => res.json(reviews));
// });




// @route   POST api/reviewsPage
// @desc    Create a review
// @access  Private
router.post('/reviewsByRest', (req, res) => {
    const { restName}  = req.body;
    console.log('restName: ',restName);
    // Simple validation
    if (!restName) {
        return res.status(400).json({msg: 'restName is null!'});
    }
    Rest.findOne({name:restName})
        .then(results => {
                console.log('results',results.reviews);
                return res.json(results.reviews);
            }
        )
        .catch( err => console.log(err));
    // newReview.save().then(reviews => res.json(reviews));
});





// @route   DELETE api/reviewsPage/:id
// @desc    Delete A review
// @access  Private
router.delete('/:id', (req, res) => {
    Review.findById(req.body._id)
        .then(review => review.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
