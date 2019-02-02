$("#landingPage").show();
$("#teamPage").hide();
$("#gamePage").hide();

$(document).ready(function() {
    $(".hypeLOGO").on('click', function() {
        $("#landingPage").hide();
        $("#teamPage").show();
        $("#gamePage").hide();
    })

    $("#start").on('click', function() {
        $("#landingPage").hide();
        $("#teamPage").show();
        $("#gamePage").hide();
    })

});