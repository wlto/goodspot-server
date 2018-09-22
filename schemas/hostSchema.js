var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hostSchema = new Schema({
    CustId: Number,
    CustName: String,
    CistEmail: String,
    PlateNum: String
});

module.exports = hostSchema;