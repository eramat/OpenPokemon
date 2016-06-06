var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.AbilityType = {
    POKE_POWER: 0, // poké-power
    POKE_BODY: 1, // poké-body
    SPECIAL_ABILITY: 2, // capacité spéciale
    TALENT: 3, // talent

    key: function (value) {
      return Object.keys(this)[Object.keys(this).map(function (key) {
        return self.EnergyType[key];
      }).indexOf(value)];
    }
  };

  self.Ability = function (_type) {
    var type;
    var action;
    var states;

    var init = function (_type) {
      type = _type;
    };

    init(_type);
  };

  return self;
}(OpenPokemon || {}));