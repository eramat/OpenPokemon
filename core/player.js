var OpenPokemon = OpenPokemon || {};

var merge = require('merge');
var core = merge(require('./card_type'), require('./stage'));

module.exports = ( function (self) {
  "use strict";

  self.Player = function (_deck) {
    var deck; // deck
    var active_pokemon; // pokémon actif
    var bench=[]; // banc
    var price_cards; // cartes Récompense
    var discard_pile; // pile de défausse
    var hand; // main

    this.deckLengh=function () {
      return deck.deckLengh();
    };

    this.hand = function () {
      var main=[];
      var i=0;
      for(i;i<hand.length;i++){
        main.push(hand[i].to_object());
      }
      return main;
    };

    //Annule et remets les cartes de la main non valide dans la deck

    this.cancelInitialHand = function () {
      hand = [];
      deck.mix();
    };

    //Cherche un pokémon de base dans la main

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

    //Vérifie si la main est valide

    this.isValidInitialHand = function () {
      return this.getFirstBasePokemonCardIndex() !== -1;
    };

    //Mélange le deck

    this.mixDeck = function () {
      deck.mix();
    };


    //Mets les cartes récompenses

    this.PutPriceCards = function () {
      price_cards = [];
      for(var i = 0; i < 6; ++i){
        price_cards.push(deck.takeFirstCard());
      }
    };

    //Mettre dans la défausse
    this.cardToDiscardPile = function(){
      discard_pile.push(card);
    };


    //Prend la première carte récompense

    this.PriceCardsToHand = function () {
      if (price_cards.length > 0) {
        var card = price_cards[0];
        price_cards.splice(0, 1);
        return card;
      } else {
        return null;
      }
    };

    //Pioche la main initiale

    this.selectInitialHand = function () {
      hand = [];
      for (var i = 0; i < 7; ++i) {
        hand.push(deck.takeFirstCard());
      }
    };
    //Prend une carte de la main

    this.takeCardInHand = function (indexHand) {
      if (indexHand < hand.length) {
        var card = hand[indexHand];

        hand.splice(indexHand, 1);
        return card;
      } else {
        return null;
      }
    };
    //ajouter au banc
    this.addBench=function(id){
      bench.push(hand[id]);
    };
    //retourner le banc
    this.bench=function(){
      var tab=[];
      var i=0;
      for (i;i<bench.length;i++){
        tab.push(bench[i].to_object());
      }
      return tab;
    };
    //passer du banc a l'active
    this.putBenchToActive=function(id) {
      if(active_pokemon==null && !bench.empty){
        active_pokemon=bench[id].to_object();
        bench.splice(id,1);
      }
    };
//retourne le pokemon actif
    this.activePokemon=function(){
      return active_pokemon;
    };
    
    //NEW
    //Piocher une carte

    this.pickACard = function(){
      hand.push(deck.takeFirstCard());
    };

    var init = function (_deck) {
      deck = _deck;
      deck.mix();
    };

    init(_deck);
  };

  return self;
}(OpenPokemon || {}));