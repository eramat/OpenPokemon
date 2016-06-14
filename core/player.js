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


    //NEW
    //Piocher une carte

    this.pickACard = function(){
      hand.push(deck.takeFirstCard());
    }




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

    //Mettre la carte de la main à l'actif
    this.putPokemonCardHandToActive = function (indexHand){
      var card=takeCardInHand(indexHand);
      if(card.card_type() === core.CardType.POKEMON){
        var taille = active_pokemon.length;
        if(taille === 0){
          active_pokemon.push(card);
        }
      }
    };

    //Mettre une carte pokemon de la main sur le banc

    this.putPokemonCardHandToBench = function (indexHand){
      var card=takeCardInHand(indexHand);
      if(card.card_type() === core.CardType.POKEMON){
        var taille = bench.length;
        if(taille<5){
          bench.push(card);
        }
      }
    };





    //Prend une carte du banc

    this.takeCardInBench = function (indexBench){
      if (indexBench < bench.length) {
        var card = bench[indexBench];
        bench.splice(index, 1);
        return card;
      } else {
        return null;
      }
    };

    //Mettre la carte du banc à l'actif

    this.putCardBenchToActive = function (indexBench) {
      var taille = active_pokemon.length;
      if(taille===0){
        active_pokemon.push(takeCardInBench(indexBench));
      }
    };


    //NEW
    this.Retreat = function(pokemon){
      //Check si energie demandée = valide
      if(pokemon.energy()>=pokemon.retreat_cost()){
        //Check taille du banc
        if(bench.length > 0){
          //on stock la carte active, on la remplace par celle du banc et on ajoute l'ancienne active au banc
          var card = active_pokemon;
          active_pokemon.splice(0,1);
          //on prend une carte du banc ( supprime la carte du banc dans la fonction )
          putCardBenchToActive(index);
          bench.push(card);
          //on défausse les energies de l'ancienne carte active, on cree un compteur
          var i=0;
          var energyCard;
          while(i<pokemon.retreat_cost()){
            //On stocke la carte energy et on la défausse
            energyCard=pokemon.energy[0];
            pokemon.energy.splice(0,1);
            discard_pile.push(energyCard);
          }
        }
      }
        //Check s'il reste une place sur le banc

    };





    var init = function (_deck) {
      deck = _deck;
      deck.mix();
    };

    init(_deck);
  };

  return self;
}(OpenPokemon || {}));