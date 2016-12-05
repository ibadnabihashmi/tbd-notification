var express           = require('express');
var path              = require('path');
var logger            = require('morgan');
var compression       = require('compression');
var methodOverride    = require('method-override');
var session           = require('express-session');
var flash             = require('express-flash');
var bodyParser        = require('body-parser');
var expressValidator  = require('express-validator');
var dotenv            = require('dotenv');
var mongoose          = require('mongoose');
var cors              = require('cors');

// Load environment variables from .env file
dotenv.load();

var notification      = require('./api/notification');

var app = express();
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
app.set('port', process.env.PORT || 3002);
app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));

app.use('/api/notification'         ,notification);

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
