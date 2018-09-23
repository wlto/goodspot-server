const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const distance = require('google-distance-matrix');
distance.key('AIzaSyBIc5RryMRvxfw5HIuxXUrC16gjOQaf-4M');
const cors = require('cors');

const port = process.env.PORT || 3000;

const connectionString = 'mongodb://goodspotu1:blahblahblah123@ds153978.mlab.com:53978/goodspot';

const dataService = require('./data-service.js');
const serverData = dataService(connectionString);

app.use(bodyParser.json());
app.use(cors());

app.get('/customers', (req, res) => {
    serverData.getAllCustomers().then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});
app.put("/customers/:customerId", (req, res) => {

    data.updateCustomerById(req.params.customerId, req.body).then((data) => {
        res.json({ "message": "Customer " + data + " updated successfully" });
    })
        .catch((err) => {
            res.status(500).end();
        })
});

app.get('/testdistance', (req, res) => {
    const userAddress = req.body.address || '4800 Yonge Street';
    const userDistance = req.body.distanceFromLocation || 2000;
    let destinations = [];
    let destinationObjs = [];
    let places = [];

    // Get server data for list of postings
    serverData.getAllPostings().then((postings) => {
        postings.forEach(function (element) {
            destinations.push(element.Address);
            destinationObjs.push(element);
        }, this);

        distance.matrix([userAddress], destinations, (err, distances) => {
            if (!err) {
                // console.log(distances.rows[0]);
                distances.rows[0].elements.forEach((ele, i)=>{
                    console.log(ele);
                    if (ele.distance.value < userDistance) {
                        places.push(destinationObjs[i]);
                    }
                    // ele.distance.value < 5000 && indices.push([i, ele]);
                })
                res.json(places);
            }       
        });
    })
});

app.post('/testdistance', (req, res) => {
    const userAddress = req.body.address || '4800 Yonge Street';
    let destinations = [];
    let destinationObjs = [];
    let indices = [];
    let places = [];

    // Get server data for list of postings
    serverData.getAllPostings().then((postings) => {
        postings.forEach(function (element) {
            destinations.push(element.Address);
            destinationObjs.push(element);
        }, this);

        distance.matrix([userAddress], destinations, (err, distances) => {
            if (!err) {
                // console.log(distances.rows[0]);
                distances.rows[0].elements.forEach((ele, i)=>{
                    console.log(ele);
                    if (ele.distance.value < 2000) {
                        places.push(destinationObjs[i]);
                    }
                    // ele.distance.value < 5000 && indices.push([i, ele]);
                })
                res.json(places);
            }       
        });
    })
});

app.post("/customers", (req, res) => {

    data.addCustomer(req.body).then((data) => {
        res.json({ "message": "Customer " + data + " added successfully" });
    })
        .catch((err) => {
            res.status(500).end();
        })
});
app.get('/postings', (req, res) => {
    serverData.getAllPostings().then((data) => {
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
    app.listen(port, () => {
        console.log('Listening at port ' + port);
    });
});