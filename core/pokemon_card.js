var OpenPokemon = OpenPokemon || {};

var core = require('./card_type');

module.exports = ( function (self) {
  "use strict";

  self.PokemonCard = function (_name, _type, _stage, _evolution, _life_point, _abilities, _attacks, _weakness, _resistance, _retreat_cost, _expansion, _card_number) {
    var name;
    var type;
    var stage;
    var evolution;
    var life_point;
    var abilities;
    var attacks;
    var weakness;
    var resistance;
    var retreat_cost;
    var expansion;
    var card_number;

    this.card_type = function () {
      return core.CardType.POKEMON;
    };

    this.name = function () {
      return name;
    };

    this.type = function () {
      return type;
    };

    this.stage = function () {
      return stage;
    };

    this.evolution = function () {
      return evolution;
    };

    this.life_point= function () {
      return life_point;
    };

    this.abilities = function () {
      return abilities;
    };

    this.attacks = function () {
      return attacks;
    };

    this.weakness = function () {
      return weakness;
    };

    this.resistance = function () {
      return resistance;
    };

    this.retreat_cost = function () {
      return retreat_cost;
    };

    this.expansion = function () {
      return expansion;
    };

    this.card_number = function () {
      return card_number;
    };

    var init = function (_name, _type, _stage, _evolution, _life_point, _abilities, _attacks, _weakness, _resistance, _retreat_cost, _expansion, _card_number) {
      name = _name;
      type = _type;
      stage = _stage;
      evolution = _evolution;
      life_point = _life_point;
      abilities = _abilities;
      attacks = _attacks;
      weakness = _weakness;
      resistance = _resistance;
      retreat_cost = _retreat_cost;
      expansion = _expansion;
      card_number = _card_number;
    };

    init(_name, _type, _stage, _evolution, _life_point, _abilities, _attacks, _weakness, _resistance, _retreat_cost, _expansion, _card_number);
  };

  return self;
}(OpenPokemon || {}));