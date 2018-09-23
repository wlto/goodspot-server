var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoiceSchema = new Schema({
    CustIdFK: { type: Schema.Types.ObjectId, ref: 'Customers' },
    PostingIdFK: { type: Schema.Types.ObjectId, ref: 'Postings' },
    Total: Number
});

module.exports = invoiceSchema;
