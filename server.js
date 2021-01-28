const { request } = require('express');
const express = require('express');
const MongoClient = require("mongodb").MongoClient;

const app = express();
const ObjectId = require("mongodb").ObjectID;

app.use(express.json());

app.use(function(request, response, next){
        console.log("The request url is:" + request.url);
        next();
});

let db;
MongoClient.connect('mongodb+srv://farhan:sophia1@cluster0.bczhm.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        if(err) return console.log("problem with db");      
        db = client.db('coursework2');
});

app.param('collection', (req, res, next, collection) => {
        req.collection = db.collection(collection)
        return next();
});

app.get('/collection/:collection', (req, res, next) => {
        req.collection.find({}).toArray((e, results) => {
                if (e) return next();
                res.send(results);
        });
});


app.post('/collection/:collection', (req, res, next) => {
        req.collection.insert(req.body, (e, results) => {
                if (e) return next();
                res.send(results.ops);
        });
});

app.put('/collection/:collection/:id', (req, res, next) => {
        req.collection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body },
                { safe: true, multi: false },
                (e, result) => {
                    if(e || result.result.n !== 1) return next();
                    res.send({ message: 'success' });
                });
});

app.use((req, res) => {
        res.status(404).send({
                message: 'Error'
        });
})

const port = process.env.PORT || 3000;

app.listen(port);
