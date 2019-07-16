let AppModel = require('../model/app');
let UserModel = require('../model/user');
const express = require('express');
// let ReviewModel = require('../model/review');

let _handleError = function(err){
    if (err) return console.log(err);
};

const router = express.Router();

router.get('/api/load/tags', function(req, res) {
        console.log('app.get/api/load/tags');
        AppModel
            .findOne()
            .then(doc => {
                res.json(doc.tags);
                res.end();
            });

    });
router.post('/api/load/images', function(req, res, next) {
        console.log('updating tag array');
        AppModel
            .findOne()
            .then(doc => {
                if (doc === null) {
                    let newDoc = new AppModel();
                    newDoc.tags.push(req.body.tag);
                    newDoc.save(_handleError);
                }else if (!doc.tags.includes(req.body.tag)) {
                        doc.tags.push(req.body.tag);
                        doc.save(_handleError);
                    }
            });
        next();
    });
router.post('/users', function(req, res) {
        console.log('/api/users');

        const { name, location, pic } = req.body;

        if(!name || !location || !pic) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        UserModel.findOne({ name })
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

router.post('/login', function(req, res) {
        console.log('/api/login');

        const { name } = req.body;

        if( !name ) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        UserModel.findOne({ name })
            .then(user => {
                if (!user) return res.status(400).json({msg: 'User Does not exist'});

                res.json({
                        name: user.name,
                        location: user.location,
                        pic: user.pic
                    });
            });

    });

router.post('/search', function(req, res) {
        console.log('/api/search');

        let query = {};
        const {userName, restName, restLocation} = req.body;

        if (userName !== undefined && userName !== null)
            query.userName = userName;
        if (restName !== undefined && restName !== null)
            query.restName = restName;
        if (restLocation !== undefined && restLocation !== null)
            query.restName = restLocation;

        console.log('/api/search', req.body, {userName, restName, restLocation}, query);

        // ReviewModel.find(query)
        //     .then (reviews =>
        //     {
        //         console.log('/results', reviews);
        //         return res.json(reviews);
        //
        //     });
});

module.exports = router;



