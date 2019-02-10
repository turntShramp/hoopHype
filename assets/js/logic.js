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
    let teamNickname;
    let teamsArr = [];
    let venue;

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
            url: "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=us&keyword=v.+" + userTeam + "&apikey=8FNAjp1NFYs6OAEXB0rh6eCJ1jrIzuu2",
            method: "GET",
        }).then(async function(response) {
            console.log(response);
            console.log(userTeam);
            response._embedded.events.forEach(function(event) {
                console.log(event._embedded.attractions[0].name);
                console.log();
                if(event._embedded.attractions[0].name.includes(teamNickname)) {
                    remainingHomeGames.push({
                        visitor: event._embedded.attractions[1].name,
                        date: moment(event.dates.start.localDate, "YYYY-MM-DD").format("dddd, MMMM Do, YYYY"),
                        url: event.url,
                        venue: event._embedded.venues[0].name + " - " + event._embedded.venues[0].city.name + ", " + event._embedded.venues[0].state.name,
                        priceMax: "$" + event.priceRanges[0].max,
                        priceMin: "$" + event.priceRanges[0].min,
                    });
                }
            });
            console.log(remainingHomeGames);
            await sortRemainingSchedule();
        });
    }

    function updateChosenTeam() {
        userTeam = $("#teamDropdown").val();
        teamNickname = userTeam.slice(userTeam.lastIndexOf(" ") + 1);
        console.log(userTeam);
        $("#chosenTeam").text(userTeam);
    }

    function sortRemainingSchedule() {
        return new Promise(function(resolve) { 
            database.ref("/gamesByExcitement").once("value", function(excitementArray) {
                excitementArray.val().forEach(function(excitingTeam) {
                    remainingHomeGames.forEach(function(game) {
                        if(excitingTeam.fullName == game.visitor) {
                            finalRecommended.push(game);
                        }
                    });
                });
                resolve("done");
            });
        });
    }

    function addTeamOptions() {
        teamsArr.forEach(function(team){
            let newOption = $("#teamOptions").clone();
            newOption.text(team.city + " " + team.nickname);
            newOption.attr("value", team.city + " " + team.nickname);
            newOption.attr("id", team.city + "-" + team.nickname)
            newOption.removeAttr("hidden");
            $("#teamDropdown").append(newOption);
        });
    }

    function populateGameRecs() {
        let counter = 1;
        console.log(finalRecommended.length);
        finalRecommended.forEach(function(homeGame){
            let newCard = $("#empty-card").clone();
            newCard.find("#game-rank").text(counter++);
            newCard.find("#who").text(homeGame.visitor);
            newCard.find("#where").text(homeGame.venue);
            newCard.find("#when").text(homeGame.date);
            newCard.find("#cost").text("Ticket cost: " + homeGame.priceMin + " - " + homeGame.priceMax);
            newCard.attr("href", homeGame.url);
            newCard.removeAttr("hidden");
            $("#games").append(newCard);
            console.log("there");
        });
    }
});
