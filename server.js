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

app.post('/testdistance', (req, res) => {
    const userAddress = req.body.address || '100 Yonge Street';
    let destinations = [];
    let indices = [];

    // Get server data for list of postings
    serverData.getAllPostings().then((data) => {
        data.forEach(function (element) {
            destinations.push(element.Address);
        }, this);

        distance.matrix([userAddress], destinations, (err, distances) => {
            if (!err) {
                //distances.rows.elements.forEach((ele, i) => {
                //    ele.distance < 2000 && indices.push([i, ele])
                //})
                distances.rows[0].elements.forEach((ele, i)=>{
                    ele.distance.value < 5000 && indices.push([i, ele]);
                })
                res.json(indices);
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