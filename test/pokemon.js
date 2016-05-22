var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var fs = require('fs');
var path = require('path');

var core = require('./../core');

describe('Pokemon card loading', function() {
  it('Pikachu', function() {
    var card_pikachu = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/42.json', 'utf8'));

    expect(card_pikachu.name()).to.equal("Pikachu");
    expect(card_pikachu.attacks().length).to.equal(2);
    expect(card_pikachu.retreat_cost()).to.equal(1);
    expect(card_pikachu.expansion().name()).to.equal("XY");
    expect(card_pikachu.expansion().number()).to.equal(146);
    expect(card_pikachu.card_number()).to.equal(42);
  });

  it('Stari & Pikachu', function() {
    var card_stari = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/33.json', 'utf8'));
    var card_pikachu = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/42.json', 'utf8'));
    var stari = new core.Pokemon(card_stari);
    var pikachu = new core.Pokemon(card_pikachu);
    var board = new core.Board([stari, pikachu]);

    expect(stari.life_point()).to.equal(60);

    board.turn();

    expect(stari.life_point()).to.equal(50);
  });

  it('All XY cards', function() {
    var cards = [];

    fs.readdir('./data/XY/XY/', function (err, files) {
      files.forEach(function (file) {
        if (path.extname(file) === '.json') {
          cards.push(new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/' + file, 'utf8')));
        }
      });
      expect(cards.length).to.equal(48);
    });
  });

});

describe('Deck', function() {
  it('Init', function () {
    var deck = new core.Deck([],[],[]);

    expect(deck).to.not.equal(null);
  });
});