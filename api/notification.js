var async           = require('async');
var express         = require('express');
var router          = express.Router();
var fs              = require('fs');
var User            = require('../models/User');
var Preferences     = require('../models/Preferences');
var Notification    = require('../models/Notification');

router.post('/create', function (req,res) {
  var tags = req.body.tags;
  var catalogueTagged = req.body.catalogueTagged;
  var message = req.body.notificationMessage;
  Preferences
    .find({
      tags:{
        $in:tags
      }
    })
    .select('userId')
    .exec(function (err,prefs) {
      async.eachSeries(prefs,function (pref,callback) {
        var notification = new Notification({
          message: message,
          createdAt: Date.now(),
          userId: pref.userId,
          catalogue: catalogueTagged
        });
        notification.save(function (err) {
          if(err){
            callback(err);
          }else{
            callback();
          }
        });
      },function (err) {
        return res.status(200).send({
          status: 200,
          exception: null,
          message: 'Notifications sent'
        });
      })
    });
});

router.get('/get',function (req,res) {
    Notification
      .find({
        userId:req.query.userId
      })
      .exec(function (err,notifications) {
        if(!err && notifications){
          return res.status(200).send({
            status: 200,
            exception: null,
            message: 'Notifications found',
            notifications:notifications
          });
        }else{
          return res.status(404).send({
            status: 404,
            exception: err?err:null,
            message: 'Notifications not found',
            notifications:null
          });
        }
      });
});

module.exports = router;