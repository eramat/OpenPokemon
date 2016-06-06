var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.State = {
    BURNED: 1, // brulé
    CONFUSED: 2, // confus
    PARALYSED: 3, // paralysé
    POISONED: 4, // empoisonné
    ASLEEP: 5, // endormi

    key: function (value) {
      return Object.keys(this)[Object.keys(this).map(function (key) {
        return self.EnergyType[key];
      }).indexOf(value)];
    }
  };

  return self;
}(OpenPokemon || {}));