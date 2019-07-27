let UserModel = require('../model/user');
let RestModel = require('../model/restaurants');
const express = require('express');

let _handleError = function (err) {
    if (err) return console.log(err);
};

const router = express.Router();

router.post('/users', function (req, res) {
    console.log('/api/users');

    const {name, location, pic} = req.body;

    if (!name || !location || !pic) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    UserModel.findOne({name})
        .then(user => {
            if (user) return res.status(400).json({msg: 'User already exists'});

            const newUser = new UserModel({
                name,
                location,
                pic
            });
            newUser.save(newUser).then(() => {
                res.json(newUser);
            })
        });

});

function getAverageSingle(review) {
    let sum = review.bathroomRate + review.cleanRate + review.staffRate +
        review.driveRate + review.deliveryRate + review.foodRate;

    if (review.driveRate === 0 || review.deliveryRate === 0)
        return sum / 5;
    if (review.driveRate !== 0 && review.deliveryRate !== 0)
        return sum / 6;
    return sum / 4;
}

function roundUpFraction(num) {
    num = num * 10;
    num = Math.trunc(num);
    return num / 10;
}

function getAverage(reviews) {
    let sum = reviews.reduce((acc, curr) => acc + getAverageSingle(curr), 0);
    return roundUpFraction(sum / reviews.length);
}

router.post('/write_review', function (req, res) {
    console.log('/api/write_review');

    const {name, location} = req.body;

    if (!name || !location) {
        return res.status(400).json({msg: 'Please enter Restaurant name and location'});
    }

    RestModel.findOne({name, location})
        .then(rest => {
            if (!rest) {
                const newRest = new RestModel({
                    name: name,
                    location: location,
                    average: getAverage([req.body.review]),
                    reviews: [req.body.review]
                });
                newRest.save(newRest).then(() => {
                    return res.json(newRest);
                });
            } else {
                let newReviews = [...rest.reviews, req.body.review];
                rest.reviews = newReviews;
                rest.average = getAverage(newReviews);
                rest.save();
                return res.json(rest);
            }
        });
});

router.post('/edit_review', function (req, res) {
    console.log('/api/edit_review');

    const {name, location} = req.body;

    if (!name || !location) {
        return res.status(400).json({msg: 'Please enter Restaurant name and location'});
    }

    RestModel.findOne({name, location})
        .then(rest => {
            let newReviews = rest.reviews.filter(function (rev) {
                return (!rev._id.equals(req.body.review._id));
            });
            newReviews = [...newReviews, req.body.review];
            rest.reviews = newReviews;
            rest.average = getAverage(newReviews);
            rest.save();
            return res.json(rest);
        });
});

router.post('/delete_review', function (req, res) {
    console.log('/api/delete_review');
    //get the relevant restaurant
    const {name, location} = req.body;
    if (!name || !location) {
        return res.status(400).json({msg: 'Please enter Restaurant name and location'});
    }

    RestModel.findOne({name, location})
        .then(rest => {
            let newReviews = rest.reviews.filter(function (rev) {
                return (!rev._id.equals(req.body._id));
            });
            rest.reviews = newReviews;
            if (newReviews.length > 0)
                rest.average = getAverage(newReviews);
            else
                rest.average = 0;
            rest.save();
            return res.json(rest);
        });
});

router.post('/edit_user', function (req, res) {
    console.log('/edit_user');

    const {oldName, name, location, pic} = req.body;

    if (!name || !location || !pic) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }
    UserModel.findOne({name: name})
        .then(user => {
            if (user)
                return res.status(400).json({msg: 'Username already exists'});
            UserModel.findOneAndUpdate({name: oldName}, {name, location, pic})
                .then(user2 => {
                    return res.json({name, location, pic});
                });
        });


});

router.post('/login', function (req, res) {
    console.log('/api/login');

    const {name} = req.body;

    if (!name) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    UserModel.findOne({name})
        .then(user => {
            if (!user) return res.status(400).json({msg: 'User Does not exist'});

            res.json({
                name: user.name,
                location: user.location,
                pic: user.pic
            });
        });

});

function sortRests(rests, sort, userLocation) {
    let sorted = rests;
    if (sort) {
        if (sort === 'closer') {
            sorted = rests.sort((a, b) => {
                if (a === userLocation && b !== userLocation) {
                    return 1;
                } else if (a.location.startsWith(userLocation) && !b.location.startsWith(userLocation)) {
                    return 1;
                } else if (a.location.startsWith(userLocation) && b.location.startsWith(userLocation) && a.location.length < b.location.length) {
                    return 1;
                } else if (a.location.includes(userLocation) && !b.location.includes(userLocation)) {
                    return 1;
                } else if (a.location.includes(userLocation) && b.location.includes(userLocation) && a.location.length < b.location.length) {
                    return 1;
                }
                return -1;
            });
        }
        if (sort === 'better') {
            sorted = rests.sort((a, b) => b.average - a.average);
        }
    }
    return sorted;
}

function gradeRadius(restLocation, userLocation) {
    switch (userLocation) {
        case 'Tel-Aviv':
            if (restLocation === 'Tel-Aviv')
                return 0;
            if (restLocation === 'Herzliya')
                return 10;
            if (restLocation === 'Jerusalem')
                return 50;
            if (restLocation === 'Haifa')
                return 80;
            if (restLocation === 'Beer Sheva')
                return 85;
            console.log("ERROR - restLocation:", restLocation, ",userLocation:", userLocation);
            break;
        case 'Herzliya':
            if (restLocation.equals('Tel-Aviv'))
                return 10;
            if (restLocation.equals('Herzliya'))
                return 0;
            if (restLocation.equals('Jerusalem'))
                return 55;
            if (restLocation.equals('Haifa'))
                return 70;
            if (restLocation.equals('Beer Sheva'))
                return 95;
            console.log("ERROR - restLocation:", restLocation, ",userLocation:", userLocation);
            break;
        case 'Jerusalem':
            if (restLocation.equals('Tel-Aviv'))
                return 50;
            if (restLocation.equals('Herzliya'))
                return 55;
            if (restLocation.equals('Jerusalem'))
                return 0;
            if (restLocation.equals('Haifa'))
                return 110;
            if (restLocation.equals('Beer Sheva'))
                return 65;
            console.log("ERROR - restLocation:", restLocation, ",userLocation:", userLocation);
            break;
        case 'Haifa':
            if (restLocation.equals('Tel-Aviv'))
                return 80;
            if (restLocation.equals('Herzliya'))
                return 70;
            if (restLocation.equals('Jerusalem'))
                return 110;
            if (restLocation.equals('Haifa'))
                return 0;
            if (restLocation.equals('Beer Sheva'))
                return 170;
            console.log("ERROR - restLocation:", restLocation, ",userLocation:", userLocation);
            break;
        case 'Beer Sheva':
            if (restLocation.equals('Tel-Aviv'))
                return 85;
            if (restLocation.equals('Herzliya'))
                return 95;
            if (restLocation.equals('Jerusalem'))
                return 65;
            if (restLocation.equals('Haifa'))
                return 170;
            if (restLocation.equals('Beer Sheva'))
                return 0;
            console.log("ERROR - restLocation:", restLocation, ",userLocation:", userLocation);
            break;
        default:
            console.log("ERROR - restLocation:", restLocation, ",userLocation:", userLocation);
            return 200;
    }
}

function gradeDistance(restLocation, userLocation) {
    let num = gradeRadius(restLocation, userLocation);
    if (num === 0)
        return 5;
    if (num < 30)
        return 4;
    if (num < 80)
        return 3;
    if (num < 100)
        return 2;
    return 1;
}


router.post('/searchRests', function (req, res) {
    console.log('/api/searchRests');

    let query = {};
    const {betterCloserFlag} = req.body;
    // console.log('req.body',req.body);
    if (!betterCloserFlag) { //if false- regular search
        const {userLocation, restName, restLocation, score, sort} = req.body;

        if (restName !== undefined && restName !== null)
            query.name = restName;
        if (restLocation !== undefined && restLocation !== null)
            query.location = restLocation;

        RestModel.find(query)
            .then(rests => {
                rests = sortRests(rests, sort, userLocation);
                if (score != null) {
                    let scoreInt = parseInt(score[1]);
                    return res.json(rests.filter(rest => rest.average >= scoreInt));
                }
                return res.json(rests);

            });

    } else {//else- better-closer search
        const {currentValue, userLocation, betterCloserScore} = req.body;
        let better, closer;
        if (currentValue < 0) { //get the aligned values
            closer = -1 * currentValue;
            better = 100 - closer;
        } else {
            better = currentValue;
            closer = 100 - better;
        }

        let scoreInt;
        if(betterCloserScore === 1)
            scoreInt=1;
        else
            scoreInt = parseInt(betterCloserScore[1]);
        better /= 100;
        closer /= 100;
        // console.log('better',better,'closer',closer,'scoreInt',scoreInt);

        RestModel.find()
            .then(rests => {
                return rests.filter(function (rest) {
                    // console.log('rest:', rest.name, (closer * (gradeDistance(rest.location, userLocation)) + (better * rest.average)));
                    return ((closer * (gradeDistance(rest.location, userLocation)) + (better * rest.average)) > scoreInt);
                });
            })
            .then(rests => {
                let sorted=rests.sort((a, b) => b.average - a.average);
                return res.json(sorted);
            })
    }
});

router.post('/searchUsers', function (req, res) {
    console.log('/api/searchUsers');

    let query = {};
    const {name, location} = req.body;

    if (name !== undefined && name !== null)
        query.name = name;
    if (location !== undefined && location !== null)
        query.location = location;

    UserModel.find(query)
        .then(users => {
            return res.json(users);

        });
});

router.post('/getSearchSuggests', function (req, res) {
    console.log('/api/getSearchSuggests');

    RestModel.find({})
        .then(rests => {
            let restNames = rests.map((rest => rest.name));
            UserModel.find({})
                .then(users => {
                    let userNames = users.map((user => user.name));
                    return res.json({users: [...new Set(userNames)], rests: [...new Set(restNames)]});
                });

        });
});

module.exports = router;
