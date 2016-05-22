var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.Player = function (_deck) {
    var deck; // deck
    var active_pokemon; // pokémon actif
    var bench; // banc
    var price_cards; // cartes Récompense
    var discard_pile; // pile de défausse
    var hand; // main

    this.mixDeck = function () {

    };

    this.selectInitialHand = function () {

    };

    var init = function (_deck) {
      deck = _deck;
    };

    init(_deck);
  };

  return self;
}(OpenPokemon || {}));