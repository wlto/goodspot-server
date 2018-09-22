var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoiceSchema = new Schema({
    InvoiceId: Number,
    Total: Number,
    PostingIdFK: { type: Schema.Types.ObjectId, ref: 'Postings' },
    CustIdFK: { type: Schema.Types.ObjectId, ref: 'Customers' }
});

module.exports = invoiceSchema;
