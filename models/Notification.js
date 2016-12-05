var mongoose    = require('mongoose');
var User        = require('../models/User');

var notificationSchema = mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});
var Notification = mongoose.model('Notification',notificationSchema);
module.exports = Notification;