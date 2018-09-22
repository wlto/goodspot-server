var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    CustId: Number,
    CustName: String,
    CistEmail: String,
    PlateNum: String
});

module.exports = customerSchema;