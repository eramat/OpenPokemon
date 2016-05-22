var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.State = {
    BURNED: 1, // brulé
    CONFUSED: 2, // confus
    PARALYSED: 3, // paralysé
    POISONED: 4, // empoisonné
    ASLEEP: 5 // endormi
  };

  return self;
}(OpenPokemon || {}));