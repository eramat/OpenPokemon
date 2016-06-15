/**
 * Created by Pierre on 14/06/2016.
 */


var socket = io();


$(document).ready(function() {
    $('#co').click(function () {
        var message = $('#pseudo').val();
        socket.emit('message', message);
    });
});
    