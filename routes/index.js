var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');
var passport = require('passport');
var Account = require('../models/account');

/*
 /* GET home page. */
/*
 router.get('/', function(req, res, next) {

 var pikachu_card = new core.Builder().createFromJSON(fs.readFileSync('../data/XY/XY/42.json', 'utf8'));
 var pikachu = new core.Pokemon(pikachu_card);

 console.log(pikachu.to_object());

 res.render('index', { card: pikachu.to_object() });
 });*/
router.get('/', function (req, res, next) {
  res.render('Accueil', {user : req.user});
});

router.get('/register', function (req, res) {
  res.render('register', {});
});

router.post('/register', function (req, res) {
    console.log("coucou");


  Account.register(new Account({username: req.body.username}), req.body.password, function (err, account) {

    if (err) {
      return res.render("register", {info: "Désolé le pseudo est deja utilisé"});
    }
    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
  });
});


router.get('/Accueil', function (req, res) {
  res.render('Accueil', {});
});

router.post('/Accueil', passport.authenticate('local'), function (req, res) {
  res.redirect('/Gestion');
  

});

router.get('/Gestion', function (req, res, next) {
  res.render('Gestion', {
    user : req.user
  });

});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


router.get('/Combat', function (req, res) {
  res.render('Combat', {});
});

router.post('/admin', function (req, res) {

  res.render('admin', {});
});


router.post('/Accueil', passport.authenticate('local'), function (req, res) {
  res.redirect('/admin');

});
module.exports = router;
