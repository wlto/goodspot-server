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

serverData.connect().then(() => {
    app.listen(8080, () => {
        console.log('Listening at port 8080');
    });
});