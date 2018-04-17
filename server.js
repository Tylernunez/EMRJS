var express = require('express');
var chalk = require('chalk');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var fs = require('fs');
app.use(bodyParser.urlencoded({
    extended: true
}));

function EMR(id, fName, lName, bloodType){
    this.id = id;
    this.firstName = fName;
    this.lastName = lName;
    this.BloodType = bloodType;
}

router.get('/', function(req, res) {
    var contents = fs.readFileSync("EMR.json");
    var jsonData = JSON.parse(contents);
    res.json(jsonData);
});

router.get('/:id', function(req, res) {
    var contents = fs.readFileSync("EMR.json");
    var parsed = JSON.parse(contents);
    res.json(parsed.EMR[req.params.id]);
});

router.post('/', function(req, res) {
    enterEMRData(req,res);
    res.send("Your data has been added.");
});

function enterEMRData(req, res){

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var bloodType = req.body.BType;

    var contents = fs.readFileSync("EMR.json");
    parsed = JSON.parse(contents);
    parsed['EMR'].push({"id":parsed['id'.length++],"firstName":firstName,"lastName":lastName,"BloodType": bloodType});
    contents = JSON.stringify(parsed);
    fs.writeFileSync("EMR.json",contents);
}

app.use('/api', router);

app.listen(5000, function(err) {
    if (err) {
        console.log(chalk.red(err));
    } else {
        console.log(chalk.blue('I am listening on 3000'));
    }
});