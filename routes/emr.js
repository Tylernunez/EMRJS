var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res) {
    var contents = fs.readFileSync("public/EMR.json");
    var jsonData = JSON.parse(contents);
    res.json(jsonData);
});

app.get('/:id', function(req, res) {
    var contents = fs.readFileSync("public/EMR.json");
    var parsed = JSON.parse(contents);
    res.json(parsed.EMR[req.params.id]);
});

app.post('/', function(req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var bloodType = req.body.BType
    res.send("First Name: " + firstName + " Last Name: " + lastName + " Blood Type: " + bloodType);
});

module.exports = app;