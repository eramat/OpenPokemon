var OpenPokemon = OpenPokemon || {};

var merge = require('merge');

var core = merge(require('./ability'), require('./attack'), require('./board'),
  require('./builder'), require('./deck'), require('./energy'), require('./energy_card'),
  require('./expansion'), require('./player'), require('./pokemon'), require('./pokemon_card'),
  require('./resistance'), require('./stage'), require('./state'), require('./trainer_card'),
  require('./turn'), require('./value'), require('./weakness'));

const util = require('util');
const vm = require('vm');

module.exports = ( function (self) {
  "use strict";

  self.Action = function (_action) {
    var action;

    this.run = function (board) {
      var sandbox = {
        board: board,
        core: core
      };

      var context = new vm.createContext(sandbox);
      var script = new vm.Script(action);

      script.runInContext(context);
    };

    var init = function (_action) {
      action = _action;
    };

    init(_action);
  };

  return self;
}(OpenPokemon || {}));