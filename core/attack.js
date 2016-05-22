var OpenPokemon = OpenPokemon || {};

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