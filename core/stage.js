var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.Stage = {
    BASE: 0,
    STAGE_1: 1,
    STAGE_2: 2,
    EX: 3,
    MEGA: 4,
    TURBO: 5,
    OBJECT: 6,

    key: function (value) {
      return Object.keys(this)[Object.keys(this).map(function (key) {
        return self.Stage[key];
      }).indexOf(value)];
    }

  };

  return self;
}(OpenPokemon || {}));
