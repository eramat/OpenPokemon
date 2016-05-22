var merge = require('merge');

module.exports = merge(require('./ability'), require('./action'), require('./attack'), require('./board'),
  require('./builder'), require('./deck'), require('./energy'), require('./energy_card'),
  require('./expansion'), require('./player'), require('./pokemon'), require('./pokemon_card'),
  require('./resistance'), require('./stage'), require('./state'), require('./trainer_card'),
  require('./turn'), require('./value'), require('./weakness'));