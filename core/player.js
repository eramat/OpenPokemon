var OpenPokemon = OpenPokemon || {};

var merge = require('merge');
var core = merge(require('./card_type'), require('./stage'));

module.exports = ( function (self) {
  "use strict";

  self.Player = function (_deck) {
    var deck; // deck
    var active_pokemon; // pokémon actif
    var bench; // banc
    var price_cards; // cartes Récompense
    var discard_pile; // pile de défausse
    var hand; // main

    this.hand = function () {
      return hand;
    };

    this.cancelInitialHand = function () {
      hand = [];
      deck.mix();
    };

    this.getFirstBasePokemonCardIndex = function () {
      var ok = false;
      var index = 0;

      while (index < hand.length && !ok) {
        if (hand[index].card_type() === core.CardType.POKEMON && hand[index].stage() === core.Stage.BASE) {
          ok = true;
        } else {
          ++index;
        }
      }
      if (!ok) {
        return -1;
      } else {
        return index;
      }
    };

    this.isValidInitialHand = function () {
      return this.getFirstBasePokemonCardIndex() !== -1;
    };

    this.mixDeck = function () {
      deck.mix();
    };

    this.selectInitialHand = function () {
      hand = [];
      for (var i = 0; i < 7; ++i) {
        hand.push(deck.takeFirstCard());
      }
    };

    this.takeCardInHand = function (index) {
      if (index < hand.length) {
        var card = hand[index];

        hand.splice(index, 1);
        return card;
      } else {
        return null;
      }
    };

    var init = function (_deck) {
      deck = _deck;
      deck.mix();
    };

    init(_deck);
  };

  return self;
}(OpenPokemon || {}));