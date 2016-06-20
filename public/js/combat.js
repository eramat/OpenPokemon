/**
 * Created by boulanger on 15/06/2016.
 */
var socket = io();
var board = $('#player');
var Playerhand = board.children('div.cards').children('div.handCards').children('ul');
var Playerbench = board.children('div.cards').children('div.benchCards').children('ul');
var benchPlayer;
var main;
var pokemonActive;

$(document).on('click','.action',function(event){
    event.stopPropagation();
    var id = $(this).attr('id');
    var src = $(this).attr('src');
    $('#zoom img').attr('src', src);
    $('#zoom').show();

    $('#menu').html('');
    if ($(this).hasClass("hand")) {
        $('#menu').append('<li><a idPokemon="'+id+'" id="toBench" href="#">Banc</a></li>');

    }else if ($(this).hasClass("bench")){
        $('#menu').append('<li><a idPokemon="'+id+'" id="toActive" href="#">Passer actif</a></li>');

    }else if ($(this).attr("id") == 'player-active' ) {
        $.each(pokemonActive.attacks, function(i, attack) {
            $('#menu').append('<li><a idAttack="' + i + '" id="attackActive" href="#">"' + attack.title + '"</a></li>');
        });
    }
    $('#menu').append('<li><a href="#">Annuler</a></li>');

});

socket.on('hand',function(hand) {
    Playerhand.html('');
    $.each(hand, function(i, card){
        Playerhand.append('<li><img src="images/cards/pokemon/XY/'+card.expansion.name+'/'+card.card_number+'.png" class="action hand" id="'+i+'"/></li>');
    });
    main=hand;
});
socket.on('bench',function(bench) {
    Playerbench.html('');
    $.each(bench, function(i, card){
        Playerbench.append('<li><img src="images/cards/pokemon/XY/'+card.expansion.name+'/'+card.card_number+'.png" class="action bench" id="'+i+'"/></li>');
    });
    benchPlayer=bench;
});
socket.on('pokemonActive',function(pokemonactif) {
    pokemonActive = pokemonactif;
    $('#player-active').attr('src','images/cards/pokemon/XY/'+pokemonactif.expansion.name+'/'+pokemonactif.card_number+'.png');
    $('#player-active').css('visibility','visible');
});

$(document).on('click','#toActive',function() {
    socket.emit("toActive",$(this).attr('idPokemon'));
});

$(document).on('click','#toBench',function() {
    socket.emit("toBench",$(this).attr('idPokemon'));
});

$(document).on('click','body',function() {
    $('#zoom').hide();
});

