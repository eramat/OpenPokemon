var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.Deck = function (_pokemon_cards, energy_cards, _trainer_cards) {
    var pokemon_cards;
    var energy_cards;
    var trainer_cards;

    this.mix = function () {

    };

    var init = function (_pokemon_cards, _energy_cards, _trainer_cards) {
      pokemon_cards = _pokemon_cards;
      energy_cards = _energy_cards;
      trainer_cards = _trainer_cards;
    };

    init(_pokemon_cards, energy_cards, _trainer_cards);
  };

  return self;
}(OpenPokemon || {}));