var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.Pokemon = function (_card) {
    var card;
    var life_point;
    var states;

    this.attacks = function () {
      return card.attacks();
    };

    this.applyDamage = function (points) {
      life_point -= points;
    };

    this.life_point = function () {
      return life_point;
    };

    this.name = function () {
      return card.name();
    };

    var init = function (_card) {
      card = _card;
      life_point = card.life_point();
      states = [];
    };

    init(_card);
  };

  return self;
}(OpenPokemon || {}));