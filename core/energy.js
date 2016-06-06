var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.EnergyType = {
    PLANT: 0, // plante
    FIRE: 1, // feu
    WATER: 2, // eau
    LIGHTNING: 3, // électrique
    PSYCHIC: 4, // psy
    FIGHTING: 5, // combat
    DARKNESS: 6, // obscurité
    METAL: 7, // métal
    FAIRY: 8, // fée
    DRAGON: 9, // dragon
    COLORLESS: 10, // incolore

    key: function (value) {
      return Object.keys(this)[Object.keys(this).map(function (key) {
        return self.EnergyType[key];
      }).indexOf(value)];
    }
  };

  return self;
}(OpenPokemon || {}));