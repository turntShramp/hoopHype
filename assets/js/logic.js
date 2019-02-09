
var config = {
apiKey: "AIzaSyCskbcwlDcnuiEemih4rcvAhct90hy16uI",
authDomain: "hoophype-a4193.firebaseapp.com",
databaseURL: "https://hoophype-a4193.firebaseio.com",
projectId: "hoophype-a4193",
storageBucket: "",
messagingSenderId: "366616680438"
};
firebase.initializeApp(config);

database = firebase.database();

let teamObjectsArr = [];
teamObjectsArr.length = 30;

$("#landingPage").show();
$("#teamPage").hide();
$("#gamePage").hide();

$(document).ready(function() {
    $(".hypeLOGO").on('click', function() {
        $("#landingPage").hide();
        $("#teamPage").show();
        $("#gamePage").hide();
    });

    $("#start").on('click', function() {
        $("#landingPage").hide();
        $("#teamPage").show();
        $("#gamePage").hide();
    });

    $("#continue").on('click', function() {
        $("#landingPage").hide();
        $("#teamPage").hide();
        $("#gamePage").show();
    });


    let remainingHomeGames = [];

    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=us&keyword=nba&city=boston&apikey=8FNAjp1NFYs6OAEXB0rh6eCJ1jrIzuu2",
        method: "GET",
    }).then(function(response) {
        console.log(response);
        response._embedded.events.forEach(function(event) {
            
        });
    });

    
});