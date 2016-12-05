var async           = require('async');
var express         = require('express');
var router          = express.Router();
var fs              = require('fs');
var User            = require('../models/User');
var Preferences     = require('../models/Preferences');
var Notification    = require('../models/Notification');

router.post('/create', function (req,res) {
  var tags = ['tag2','tag12'];
  //var fromUser = req.body.fromUser;
  //var catalogueTagged = req.body.catalogueTagged;
  //var message = req.body.notificationMessage;
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
                  catalogue: catalogueTagged,
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