var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertySchema = new Schema({
    propertyName: String,
        propertyType: String,
        propertyAddress: String,
        propertyLocation: String,
        propertyOwner: String,
        propertyStatus: String,
        isApproved: Boolean,
        publicAddress: String,
        price: Number,

},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Property', propertySchema);