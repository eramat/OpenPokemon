var merge = require('merge');
var core = merge(require('./ability'), require('./action'), require('./attack'), require('./energy'),
  require('./expansion'), require('./pokemon'), require('./resistance'), require('./stage'),
  require('./state'), require('./value'), require('./weakness'));

module.exports = ( function (self) {
  "use strict";

  self.Builder = function () {
    this.createFromJSON = function (json) {
      var data = JSON.parse(json);
      var weakness = data.weakness ? new core.Weakness(core.EnergyType[data.weakness.type],
        new core.Value(data.weakness.value.operator, data.weakness.value.value, data.weakness.value.supplement)) : null;
      var resistance = data.resistance ? new core.Resistance(core.EnergyType[data.resistance.type],
        new core.Value(data.resistance.value.operator, data.resistance.value.value, data.resistance.value.supplement)) : null;
      var expansion = new core.Expansion(data.expansion.name, data.expansion.card_number);
      var attacks = [];

      data.attacks.forEach(function (attack) {
        var energies = [];
        var value = new core.Value(attack.value.operator, attack.value.value, attack.value.supplement);

        attack.energies.forEach(function (energy) {
          energies.push(core.EnergyType[energy.type]);
        });
        attacks.push(new core.Attack(energies, attack.title, attack.text, new core.Action(attack.action), value));
      });
      return new core.PokemonCard(data.name, core.EnergyType[data.type], core.Stage[data.stage], data.evolution, data.life_point,
        data.abilities, attacks, weakness, resistance, data.retreat_cost, expansion, data.card_number, data.rarity);
    };
  };

  return self;
}({}));