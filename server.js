const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const connectionString = 'mongodb://goodspotu1:blahblahblah123@ds153978.mlab.com:53978/goodspot';

const dataService = require('./data-service.js');
const serverData = dataService(connectionString);

app.use(bodyParser.json());

app.get('/customers', (req, res) => {
    serverData.getAllCustomers().then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});
app.put("/customers/:customerId", (req, res) => {

    data.updateCustomerById(req.params.customerId, req.body).then((data)=>{
        res.json({"message": "Customer " + data + " updated successfully"});
    })
    .catch((err)=>{
        res.status(500).end();
    })
});

app.get('/testdistance', (req, res) => {
    const userAddress = req.body.address || '100 Yonge Street';
    console.log(userAddress);
});

app.post("/customers", (req, res) => {
    
    data.addCustomer(req.body).then((data)=>{
        res.json({"message": "Customer " + data + " added successfully"});
    })
    .catch((err)=>{
        res.status(500).end();
    })
});
app.get('/hosts', (req, res) => {
    serverData.getAllHosts().then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});
app.get('/postings', (req, res) => {
    serverData.getAllPostings().then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});
app.get('/locations', (req, res) => {
    serverData.getAllLocations().then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});
app.get('/invoices', (req, res) => {
    serverData.getAllInvoices().then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

serverData.connect().then(() => {
    app.listen(8080, () => {
        console.log('Listening at port 8080');
    });
});