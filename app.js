var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* Nos routes : */
var routes = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use('/', routes);

// passport config
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// BDD mongoose
mongoose.connect('mongodb://localhost/OpenPokemon');
var ConfigBDD = require('./BDD/BDD.js');
app.db = mongoose.createConnection(ConfigBDD.url);
require('./bdd')(app, mongoose);
var collection = app.db.collection('accounts');

app.db.models.Account.findOne({'username':'admin'}, function (req,account) {
  //si on ne trouve pas de username admin
  if (account == null){
    //on en créé un
      console.log('pas admin , on en fait un');
      app.db.models.Account.create({'username':'admin','password':'admin'});
  }else {
    //il y en a déjà, donc on les supprime, et on en refait un
    console.log('un admin, on le delete, et on en refait un ');
    collection.remove({'username':'admin'});
    app.db.models.Account.create({'username':'admin','password':'admin'});
  }
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
