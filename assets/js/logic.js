var config = {
    apiKey: "AIzaSyCskbcwlDcnuiEemih4rcvAhct90hy16uI",
    authDomain: "hoophype-a4193.firebaseapp.com",
    databaseURL: "https://hoophype-a4193.firebaseio.com",
    projectId: "hoophype-a4193",
    storageBucket: "",
    messagingSenderId: "366616680438"
    };

    firebase.initializeApp(config);
    let database = firebase.database();
    
    let userTeam = "Boston";
    let teamsArr = [];

    database.ref("/teams").once("value", function(teamArray) {
        teamsArr = teamArray.val();
    });
    // Landing Page 
        // // temporary for build
        // $("#gamePage").show();
        // $("#landingPage").hide();
        // $("#teamPage").hide();
        // // 
    $("#landingPage").show();
    $("#teamPage").hide();
    $("#gamePage").hide();
    
$(document).ready(function() {
        // hoopHype Logo Link
        $(".hypeLOGO").on('click', function() {
            $("#landingPage").hide();
            $("#teamPage").show();
            $("#gamePage").hide();
        })
    
        // Team Page
        $("#start").on('click', function() {
            $("#landingPage").hide();
            $("#teamPage").show();
            $("#gamePage").hide();
        })
    
        // Game Page
        $("#continue").on('click', function() {
            $("#landingPage").hide();
            $("#teamPage").hide();
            $("#gamePage").show();
            populateGameRecs();
        });


    let remainingHomeGames = [];
    
    


    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=us&keyword=nba&city=boston&apikey=8FNAjp1NFYs6OAEXB0rh6eCJ1jrIzuu2",
        method: "GET",
    }).then(function(response) {
        console.log(response);
        response._embedded.events.forEach(function(event) {
            remainingHomeGames.push({
                visitor: event.name.slice(event.name.indexOf("vs. ") + 4),
                date: event.dates.start.localDate,
                url: event.url,
            });
        });
        console.log(remainingHomeGames);
    });

    function updateChosenTeam() {
        $("#chosenTeam").text(userTeam);
    }

    function addTeamOptions() {
        teamsArr.forEach(function(team){
        let newOption = $("#teamOption").clone();
        newOption.text = team.city + team.nickname;
        newOption.removeAttr("hidden");
        $("#teamDropdown").append(newOption);
        });
    }

    function populateGameRecs() {
        remainingHomeGames.forEach(function(homeGame) {
            let newCard = $("#empty-card").clone();
            newCard.find("#who").text(homeGame.visitor);
            newCard.find("#where").text(userTeam);
            newCard.find("#when").text(homeGame.date);
            newCard.find("#tmURL").attr("href", homeGame.url);
            newCard.removeAttr("hidden");
            $("#games").append(newCard);
        });
    }
});
