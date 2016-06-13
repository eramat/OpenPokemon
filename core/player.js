var OpenPokemon = OpenPokemon || {};

var merge = require('merge');
var core = merge(require('./card_type'), require('./stage'));

module.exports = ( function (self) {
  "use strict";

  self.Player = function (_deck) {
    var deck; // deck
    var active_pokemon; // pokémon actif
    var bench; // banc
    var price_cards; // cartes Récompense
    var discard_pile; // pile de défausse
    var hand; // main

    this.hand = function () {
      return hand;
    };

    this.cancelInitialHand = function () {
      hand = [];
      deck.mix();
    };

    this.getFirstBasePokemonCardIndex = function () {
      var ok = false;
      var index = 0;

      while (index < hand.length && !ok) {
        if (hand[index].card_type() === core.CardType.POKEMON && hand[index].stage() === core.Stage.BASE) {
          ok = true;
        } else {
          ++index;
        }
      }
      if (!ok) {
        return -1;
      } else {
        return index;
      }
    };

    this.isValidInitialHand = function () {
      return this.getFirstBasePokemonCardIndex() !== -1;
    };

    this.mixDeck = function () {
      deck.mix();
    };

    this.selectInitialHand = function () {
      hand = [];
      for (var i = 0; i < 7; ++i) {
        hand.push(deck.takeFirstCard());
      }
    };

    this.takeOneCard = function () {
      hand.push(deck.takeFirstCard());
    };

    this.takeCardInHand = function (index) {
      if (index < hand.length) {
        var card = hand[index];

        hand.splice(index, 1);
        return card;
      } else {
        return null;
      }
    };


    //Prend une carte de la main

    this.takeCardInHand = function (index) {
      if (index < hand.length) {
        var card = hand[index];

        hand.splice(index, 1);
        return card;
      } else {
        return null;
      }
    };

    //Check la taille du banc

    this.checkLengthBench = function () {
      return bench.length;
    };

    //Mettre une carte pokemon de la main sur le banc

    this.putPokemonCardHandToBench = function (){
      var card=takeCardInHand(index);
      if(card.card_type() === core.CardType.POKEMON){
        var taille = checkLengthBench();
        if(taille<5){
          bench.push(card);
        }
      }
    };

    //Prend une carte du banc

    this.takeCardInBench = function (index){
      if (index < bench.length) {
        var card = bench[index];
        bench.splice(index, 1);
        return card;
      } else {
        return null;
      }
    };

    //Check la carte active

    this.checkActiveCard = function (){
      return active_pokemon !== null;
    };

    //Mettre la carte du banc à l'actif

    this.putCardBenchToActive = function () {
      var taille = checkActiveCard();
      if(taille==0){
        active_pokemon.push(takeCardInBench(index));
      }
    };

    this.putPokemonCardHandToActive = function (){
      var card=takeCardInHand(index);
      if(card.card_type() === core.CardType.POKEMON){
        var taille = checkActiveCard();
        if(taille === 0){
          active_pokemon.push(card);
        }
      }
    };

    this.cardToDiscardPile = function(){
      discard_pile.push(card);
    };

    var init = function (_deck) {
      deck = _deck;
      deck.mix();
    };

    init(_deck);
  };

  return self;
}(OpenPokemon || {}));