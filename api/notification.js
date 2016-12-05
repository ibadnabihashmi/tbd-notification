var async       = require('async');
var express     = require('express');
var router      = express.Router();
var fs          = require('fs');
var User        = require('../models/User');

router.post('/create', function (req,res) {
  var tags = req.body.tags;
  var fromUser = req.body.fromUser;
  var catalogueTagged = req.body.catalogueTagged;
});

router.get('/get',function (req,res) {
    User
      .findById("583bd10a13c4a653583166ee")
      .exec(function (err,user) {
        if(err){
          console.log(err);
          res.send(200,{
            err:err
          });
        }else{
          res.send(200,{
            user:user
          });
        }
      });
});

module.exports = router;