var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var card_stari = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/33.json', 'utf8'));
  var stari = new core.Pokemon(card_stari);

  res.render('index', { title: stari.name() });
});

module.exports = router;
