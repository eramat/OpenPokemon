var OpenPokemon = OpenPokemon || {};

var core = require('./energy');

module.exports = ( function (self) {
  "use strict";

  self.Weakness = function (_energy, _value) {
    var energy;
    var value;

    this.energy = function () {
      return energy;
    };

    this.value = function () {
      return value;
    };

    var init = function (_energy, _value) {
      energy =  _energy;
      value = _value;
    };

    this.to_object = function () {
      return {
        energy: core.EnergyType.key(energy),
        value: value ? value.to_object() : null
      };
    };

    init(_energy, _value);
  };

  return self;
}(OpenPokemon || {}));