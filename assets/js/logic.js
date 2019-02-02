$("#landingPage").show();
$("#teamPage").hide();
$("#gamePage").hide();

$(document).ready(function() {

    $("#start").on('click', function() {
        $("#landingPage").hide();
        $("#teamPage").show();
        $("#gamePage").hide();
    })

});