/**
 * Created by Pierre on 14/06/2016.
 */



var socket = io();

$(document).ready(function() {

    socket.on('message', function () {
        insereMessage(message);

    });

    function insereMessage(message){
        document.getElementById('listejoueur').innerHTML +=   message ;
        socket.emit('')
    }
});