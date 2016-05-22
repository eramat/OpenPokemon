var OpenPokemon = OpenPokemon || {};

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

    init(_energy, _value);
  };

  return self;
}(OpenPokemon || {}));