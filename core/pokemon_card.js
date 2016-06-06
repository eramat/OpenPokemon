var OpenPokemon = OpenPokemon || {};

var merge = require('merge');
var core = merge(require('./card_type'), require('./energy'), require('./stage'));

module.exports = ( function (self) {
  "use strict";

  self.PokemonCard = function (_name, _type, _stage, _evolution, _life_point, _abilities, _attacks, _weakness, _resistance, _retreat_cost, _expansion, _card_number, _rarity) {
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
    var rarity;

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

    this.rarity = function () {
      return rarity
    };

    this.to_object = function () {
      return {
        name: name,
        type: core.EnergyType.key(type),
        stage: core.Stage.key(stage),
        life_point: life_point,
        attacks: attacks.map(function (attack) { return attack.to_object(); }),
        weakness: weakness.to_object(),
        resistance: resistance.to_object(),
        retreat_cost: retreat_cost,
        expansion: expansion.to_object(),
        card_number: card_number,
        rarity: rarity
      }
    };

    var init = function (_name, _type, _stage, _evolution, _life_point, _abilities, _attacks, _weakness, _resistance, _retreat_cost, _expansion, _card_number, _rarity) {
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
      rarity = _rarity;
    };

    init(_name, _type, _stage, _evolution, _life_point, _abilities, _attacks, _weakness, _resistance, _retreat_cost, _expansion, _card_number, _rarity);
  };

  return self;
}(OpenPokemon || {}));