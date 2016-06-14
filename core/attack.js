var OpenPokemon = OpenPokemon || {};

var core = require('./energy');

module.exports = ( function (self) {
  "use strict";

  self.Attack = function (_energies, _title, _text, _action, _value) {
    var energies;
    var title;
    var text;
    var action;
    var value;

    this.energies = function() {
      return energies;
    };

    this.title = function() {
      return title;
    };

    this.text = function() {
      return text;
    };

    this.action = function() {
      return action;
    };

    this.value = function() {
      return value;
    };

    this.doAttack = function(){


    }

    this.to_object = function () {
      return {
        energies: energies.map(function (energy) { return core.EnergyType.key(energy); }),
        title: title,
        text: text,
        value: value ? value.to_object() : null
      };
    };

    var init = function (_energies, _title, _text, _action, _value) {
      energies =  _energies;
      title = _title;
      text = _text;
      action = _action;
      value = _value;
    };

    init(_energies, _title, _text, _action, _value);
  };

  return self;
}(OpenPokemon || {}));