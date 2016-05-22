var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.Value = function (_operator, _value, _supplement) {
    var operator;
    var value;
    var supplement;

    this.operator = function () {
      return operator;
    };

    this.value = function () {
      return value;
    };

    this.supplement = function () {
      return supplement;
    };

    var init = function (_operator, _value, _supplement) {
      operator =  _operator;
      value = _value;
      supplement = _supplement;
    };

    init(_operator, _value, _supplement);
  };

  return self;
}(OpenPokemon || {}));