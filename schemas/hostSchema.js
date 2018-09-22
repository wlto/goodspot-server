var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hostSchema = new Schema({
    HostId: Number,
    HostName: String,
    HostEmail: String,
    HostPassword: String
});

module.exports = hostSchema;