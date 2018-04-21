var express = require('express');
var chalk = require('chalk');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var fs = require('fs');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var EMR_COLLECTION = "EMRs";

app.use(bodyParser.urlencoded({
    extended: true
}));

function EMR(id, fName, lName, bloodType){
    this._id = id;
    this.firstName = fName;
    this.lastName = lName;
    this.BloodType = bloodType;
}

var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://tNunez:emrdb415@ds153869.mlab.com:53869/heroku_q5dbnlsf", function (err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }


    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");

    app.use('/api', router);

    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});


function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

router.get('/', function(req, res) {
    db.collection(EMR_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get EMRs.");
        } else {
            res.status(200).json(docs);
        }
    });
});

router.get('/:_id', function(req, res) {
    db.collection(EMR_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get contact");
        } else {
            res.status(200).json(doc);
        }
    });
});

router.post('/', function(req, res) {
    var newEMR = req.body;

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    }

    db.collection(EMR_COLLECTION).insertOne(newEMR, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

router.put("/:_id", function(req, res) {

    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(EMR_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update contact");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

router.delete("/:_id", function(req, res) {

    db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete contact");
        } else {
            res.status(200).json(req.params.id);
        }
    });

});

