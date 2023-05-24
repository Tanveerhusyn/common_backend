var express = require('express');
var router = express.Router();
const PropertyModel = require("../models/PropertyModel")


//add new property
router.post('/requestproperty', function (req, res, next) {
    PropertyModel.create(req.body)
        .then((result) => {
            console.log('new property has been Added ', result);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        }, (err) => next(err))
        .catch((err) => next(err));
});

//delete property
router.delete('/deleteproperty/:id', function (req, res, next) {
    PropertyModel.deleteOne({ _id: req.params.id }, function (error, results) {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
});

//update property
router.put('/updateproperty/:id', function (req, res, next) {
    PropertyModel.findOneAndUpdate({ _id: req.params.id }, {
        "$set": {
            "name": req.body.name
        }
    }, { new: true, upsert: false }, function (error, results) {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
});


//get all all properties
router.get('/allproperties', async function (req, res, next) {
    PropertyModel.find({}).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
});
//get single property
router.get('/singleproperty/:id', async function (req, res, next) {
    PropertyModel.findOne({ _id: req.params.id }, function (error, results) {
        if (error) {
            return next(error);
        }
        res.json(results);
    });


});


module.exports = router;