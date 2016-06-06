var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.CardType = {
    POKEMON: 0,
    ENERGY: 1,
    TRAINER: 2,

    key: function (value) {
      return Object.keys(this)[Object.keys(this).map(function (key) {
        return self.EnergyType[key];
      }).indexOf(value)];
    }

  };

  return self;
}(OpenPokemon || {}));