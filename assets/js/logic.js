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



    $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('http://data.nba.net/10s/prod/v1/2018/team_stats_rankings.json') + '&callback=?', function(data){
	console.log(data);
});
    
});