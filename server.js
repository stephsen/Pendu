const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const app = express();
var URL = 'mongodb://localhost:27017/mydatabase';
var db;

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoClient.connect(URL, function(err, db) {
    if (err) {
        return console.log(err);
    }
    db.collection('lependu').find().toArray(function(err, result) {
        if (err) {
            return console.log(err);
        }
        console.log(result);
    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    db.collection('lependu').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('saved to database');
        res.redirect('/');
    });
});

app.listen(3000, function() {
    console.log('listening on 3000');
});
