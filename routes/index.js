var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');
/*
/* GET home page. */

router.get('/carte', function(req, res, next) {
  
  var pikachu_card = new core.Builder().createFromJSON(fs.readFileSync('../data/XY/XY/42.json', 'utf8'));
  var pikachu = new core.Pokemon(pikachu_card);

  console.log(pikachu.to_object());

  res.render('index', { card: pikachu.to_object() });
});


router.get('/', function(req, res, next) {
  res.render('Accueil', { });
});
router.get('/Inscription', function(req, res, next) {
  res.render('Inscription', { });
});

module.exports = router;
