var OpenPokemon = OpenPokemon || {};

var core = require('./card_type');

module.exports = ( function (self) {
  "use strict";

  self.EnergyCard = function (_type) {
    var type;

    this.card_type = function () {
      return core.CardType.ENERGY;
    };

    this.type = function () {
      return type;
    };

    var init = function (_type) {
      type = _type;
    };

    init(_type);
  };

  return self;
}(OpenPokemon || {}));