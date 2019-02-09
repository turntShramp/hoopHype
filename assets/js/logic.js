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
    
    let userTeam;
    let teamsArr = [];
    let homeCity;

    database.ref("/teams").once("value", function(teamArray) {
        teamsArr = teamArray.val();
    });
    // Landing Page 
        
    $("#landingPage").show();
    $("#teamPage").hide();
    $("#gamePage").hide();
    
$(document).ready(function() {
        // hoopHype Logo Link
        $(".hypeLOGO").on('click', function() {
            $("#landingPage").hide();
            $("#teamPage").show();
            $("#gamePage").hide();
        });
    
        // Team Page
        $("#start").on('click', function() {
            $("#landingPage").hide();
            $("#teamPage").show();
            $("#gamePage").hide();
            addTeamOptions();
        })
    
        // Game Page
        $("#continue").on('click', async function() {
            $("#landingPage").hide();
            $("#teamPage").hide();
            $("#gamePage").show();
            updateChosenTeam();
            await pullRemainingGames();
            populateGameRecs();
        });


    let remainingHomeGames = [];
    let finalRecommended = [];
    
    

    async function pullRemainingGames() {
        return $.ajax({
            url: "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=us&keyword=nba&city=" + userTeam + "&apikey=8FNAjp1NFYs6OAEXB0rh6eCJ1jrIzuu2",
            method: "GET",
        }).then(async function(response) {
            console.log(response);
            response._embedded.events.forEach(function(event) {
                remainingHomeGames.push({
                    visitor: event.name.slice(event.name.indexOf("vs. ") + 4),
                    date: event.dates.start.localDate,
                    url: event.url,
                });
            });
            await sortRemainingSchedule();
        });
    }

    function updateChosenTeam() {
        userTeam = $("#teamDropdown").val();
        console.log(userTeam);
        $("#chosenTeam").text(userTeam);
    }

    function sortRemainingSchedule() {
        return database.ref("/gamesByExcitement").once("value", function(excitementArray) {
            excitementArray.val().forEach(function(excitingTeam) {
                remainingHomeGames.forEach(function(game) {
                    if(excitingTeam.fullName == game.visitor) {
                        finalRecommended.push(game);
                    }
                });
            });
        });
    }

    function addTeamOptions() {
        teamsArr.forEach(function(team){
            let newOption = $("#teamOptions").clone();
            newOption.text(team.city + " " + team.nickname);
            newOption.attr("value", team.city);
            newOption.attr("id", team.city + "-" + team.nickname)
            newOption.removeAttr("hidden");
            $("#teamDropdown").append(newOption);
        });
    }

    function populateGameRecs() {
        let counter = 1;
        console.log(finalRecommended.length);
        for(i = 0; i < finalRecommended.length; i++) {
            console.log('here');
            let homeGame = finalRecommended[i];
            let newCard = $("#empty-card").clone();
            newCard.find("#game-rank").text(counter++);
            newCard.find("#who").text(homeGame.visitor);
            newCard.find("#where").text(userTeam);
            newCard.find("#when").text(homeGame.date);
            newCard.find("#tmURL").attr("href", homeGame.url);
            newCard.removeAttr("hidden");
            $("#games").append(newCard);
            console.log("there");
        }
    }
});
