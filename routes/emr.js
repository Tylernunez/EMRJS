var express = require('express');
var router = express.Router();

router.route('/')
    .get(function (req,res){
        res.send('Get All EMRs')
    })
    .post(function (req,res){
        res.send('Add EMR')
    })

module.exports = router;