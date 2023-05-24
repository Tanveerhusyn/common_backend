var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    cnic: String,
    address: String,
    walletAddress: {
        type: String,
        default: ''
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('User', userSchema);