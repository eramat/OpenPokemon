var OpenPokemon = OpenPokemon || {};

var core = require('./card_type');

module.exports = ( function (self) {
  "use strict";

  self.TrainerCard = function () {

    this.card_type = function () {
      return core.CardType.TRAINER;
    };

    var init = function () {
    };

    init();
  };

  return self;
}(OpenPokemon || {}));