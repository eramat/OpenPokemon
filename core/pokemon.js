var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.Pokemon = function (_card) {
    var card;
    var life_point;
    var states;
    var energy;

    this.attacks = function () {
      return card.attacks();
    };

    this.applyDamage = function (points) {
      life_point -= points;
    };

    this.life_point = function () {
      return life_point;
    };

    this.energy = function(){
      return energy;
    }

    this.name = function () {
      return card.name();
    };

    //NEW
    this.retreat_cost=function(){
      return card.retreat_cost();
    }


    this.addEnergyActive= function (index,player) {
      if (player.hand()[index].card_type() === core.CardType.ENERGY) {
        if (player.checkActiveCard()) {
          energy.push(player.takeCardInHand(index));
        }
      }
    };

    this.addEnergyBench= function (indexEnergy,indexBench,player) {
      if (player.hand()[indexEnergy].card_type() === core.CardType.ENERGY) {
        energy.push(player.takeCardInHand(indexBench));
      }
    };



    this.to_object = function () {
      return card.to_object();
    };

    var init = function (_card) {
      card = _card;
      life_point = card.life_point();
      states = [];
      energy = [];
    };

    init(_card);
  };

  return self;
}(OpenPokemon || {}));