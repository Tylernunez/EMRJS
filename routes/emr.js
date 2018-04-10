var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/', function(req, res, next) {
    var contents = fs.readFileSync("public/EMR.json");
    res.send(contents);
});

router.get('/:id', function(req, res, next) {
    var contents = fs.readFileSync("public/EMR.json");
    var parsed = JSON.parse(contents);
    res.send(parsed.EMR[id].firstName + " " + parsed.EMR[id].lastName );
});

module.exports = router;