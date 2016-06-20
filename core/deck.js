var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.Deck = function (_pokemon_cards, energy_cards, _trainer_cards) {
    var pokemon_cards;
    var energy_cards;
    var trainer_cards;
    var indexes;

    this.pokemon_cards = function () {
      return pokemon_cards;
    };

    this.energy_cards = function () {
      return energy_cards;
    };

    this.firstCard = function () {
      if (indexes.length > 0) {
        return indexes[0];
      } else {
        return null;
      }
    };

    this.takeFirstCard = function () {
      if (indexes.length > 0) {
        var card = indexes[0];

        indexes.splice(0, 1);
        return card;
      } else {
        return null;
      }
    };

    this.trainer_cards = function () {
      return trainer_cards;
    };




    this.mix = function () {
      var list = [];

      indexes = [];
      for (var i = 0; i < 60; ++i) {
        list.push(i);
        indexes.push(null);
      }
      pokemon_cards.forEach(function (card) {
        var index = Math.floor(Math.random() * list.length);

        indexes[list[index]] = card;
        list.splice(index, 1);
      });
      energy_cards.forEach(function (card) {
        var index = Math.floor(Math.random() * list.length);

        indexes[list[index]] = card;
        list.splice(index, 1);
      });
      trainer_cards.forEach(function (card) {
        var index = Math.floor(Math.random() * list.length);

        indexes[list[index]] = card;
        list.splice(index, 1);
      });
    };




    this.valid = function () {
      return pokemon_cards.length + energy_cards.length + trainer_cards.length === 60;
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