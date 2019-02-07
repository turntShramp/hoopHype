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

    $("#continue").on('click', function() {
        $("#landingPage").hide();
        $("#teamPage").hide();
        $("#gamePage").show();
    })


});