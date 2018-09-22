var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
    LocationId: Number,
    Address: String,
    Street: String,
    City: String,
    Country: String,
    PostalCode: String
});

module.exports = locationSchema;
