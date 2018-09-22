var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoiceSchema = new Schema({
    InvoiceId: Number,
    PostingIdFK: Number,
    Total: Number,
    CustIdFK: Number
});

module.exports = invoiceSchema;
