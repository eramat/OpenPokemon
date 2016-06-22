/**
 * Created by boulanger on 15/06/2016.
 */
var socket = io();
var Playerboard = $('#player');
var Playerhand = Playerboard.children('div.cards').children('div.handCards').children('ul');
var Playerbench = Playerboard.children('div.cards').children('div.benchCards').children('ul');
var PlayerlP= Playerboard.children('div.cards').children('div.activCards').children('div.life_point');
var Ennemyboard= $('#ennemy');
var Ennemyhand = Ennemyboard.children('div.cards').children('div.handCards').children('ul');
var benchPlayer;
var Hand;
var pokemonActive;

$(document).on('click','.action',function(event){
    event.stopPropagation();
    var id = $(this).attr('id');
    var src = $(this).attr('src');
    $('#zoom img').attr('src', src);
    $('#zoom').show();

    $('#menu').html('');
    if ($(this).hasClass("hand")) {
        $('#menu').append('<li><a idPokemon="'+id+'" id="HandtoBench" href="#">Banc</a></li>');

    }else if ($(this).hasClass("bench")){
        $('#menu').append('<li><a idPokemon="'+id+'" id="BenchtoActive" href="#">Passer actif</a></li>');

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
    Hand=hand;
});
socket.on('ennemyhand',function(ennemhand) {
    Ennemyhand.html('');
    for(var i=0;i <ennemhand;i++){
        console.log(ennemhand);
        Ennemyhand.append('<li><img src="images/site/dos.jpg"/></li>');
    }
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
socket.on('life_point',function(life_point){
    PlayerlP.html('');
    if (life_point!=0){
        PlayerlP.append('<li>'+life_point+'</li>');
        PlayerlP.css('visibility','visible'); }
    else {
        PlayerlP.css('visibility','hidden');
    }
});
$(document).on('click','#HandtoBench',function() {
    socket.emit("toBench",$(this).attr('idPokemon'));
});
$(document).on('click','#BenchtoActive',function() {
    socket.emit("toActive",$(this).attr('idPokemon'));
});
$(document).on('click','body',function() {
    $('#zoom').hide();
});

