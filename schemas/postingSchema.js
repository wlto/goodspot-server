var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postingSchema = new Schema({
    PostingId: Number,
    Title: String,
    Price: Number,
    FromTime: Date,
    ToTime: Date,
    HostIdFK: { type: Schema.Types.ObjectId, ref: 'Hosts' },
    LocationIdFK: { type: Schema.Types.ObjectId, ref: 'Locations' }
});

module.exports = postingSchema;
