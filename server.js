const { request } = require('express');
const express = require('express');
const MongoClient = require("mongodb").MongoClient;

const app = express();
const ObjectId = require("mongodb").ObjectID;

app.use(express.json());

app.use(function(request, response){
        console.log("The request url is:" + request.url);
        
});

let db;
MongoClient.connect('mongodb+srv://farhan:sophia1@cluster0.lu2f0.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    db = client.db('coursework2');
});

app.listen(3000);
