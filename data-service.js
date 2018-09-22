const mongoose = require('mongoose');

const customerSchema = require('./schemas/customerSchema.js');

module.exports = function (connectionString) {
    let Customers;
    let Hosts;
    let Postings;
    let Locations;
    let Invoices;

    return {
        connect: function () {
            return new Promise(function (resolve, reject) {
                let db = mongoose.createConnection(connectionString);

                db.on('error', (err) => {
                    reject(err);
                });

                db.once('open', () => {
                    Customers = db.model('customers', customerSchema);
                    
                    resolve();
                });
            });
        },
        getAllCustomers: function () {
            return new Promise(function (resolve, reject) {
                Customers.find()
                .exec()
                .then(customers => {
                    resolve(customers);
                })
                .catch(err => {
                    reject(err);
                });
            });
        }
    }
};