var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.Expansion = function (_name, _number) {
    var name;
    var number;

    this.name = function () {
      return name;
    };

    this.number = function () {
      return number;
    };

    var init = function (_name, _number) {
      name=  _name;
      number = _number;
    };

    init(_name, _number);
  };

  return self;
}(OpenPokemon || {}));