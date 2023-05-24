// var express = require('express');
// var router = express.Router();
// const UserModer = require('../models/UserModel')


// //update KYC status api

// router.put('/updateKYC/:id', function (req, res, next) {
//     UserModer.findOneAndUpdate({ _id: req.params.id }, {
//         "$set": {
//             "walletAddress": true
//         }
//     }, { new: true, upsert: false }, function (error, results) {
//         if (error) {
//             return next(error);
//         }
//         res.json(results);
//     });
// });



// //user signup
// router.post('/singup', function (req, res, next) {
//     UserModer.create(req.body)
//         .then((result) => {
//             res.json(result);
//         }, (err) => next(err))
//         .catch((err) => next(err));
// });

// //delete user
// router.delete('/deleteuser/:id', function (req, res, next) {
//     UserModer.deleteOne({ _id: req.params.id }, function (error, results) {
//         if (error) {
//             return next(error);
//         }
//         res.json(results);
//     });
// });

// //update user
// router.put('/updateuser/:id', function (req, res, next) {
//     UserModer.findOneAndUpdate({ _id: req.params.id }, {
//         "$set": {
//             "name": req.body.name
//         }
//     }, { new: true, upsert: false }, function (error, results) {
//         if (error) {
//             return next(error);
//         }
//         res.json(results);
//     });
// });


// //get all user
// router.get('/allusers', async function (req, res, next) {
//     UserModer.find({}).exec(function (error, results) {
//         if (error) {
//             return next(error);
//         }
//         res.json(results);
//     });
// });
// //get single user
// router.get('/singleuser/:id', async function (req, res, next) {
//     UserModer.findOne({ _id: req.params.id }, function (error, results) {
//         if (error) {
//             return next(error);
//         }
//         res.json(results);
//     });


// });


// module.exports = router;