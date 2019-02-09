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

    let teamNamesAlphaArray = [];
    teamNamesAlphaArray;
    
    let teamObjectsArr = [];
    teamObjectsArr.length = 30;

$(document).ready(function() {
    $("#update").on("click", function(event){
        $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('http://data.nba.net/10s/prod/v1/2018/team_stats_rankings.json') + '&callback=?', {}, function(data){
            console.log(data);
            data.contents.league.standard.regularSeason.teams.forEach( function(teamStats) {
                if(teamStats.apg.avg !== "-") {
                    teamObjectsArr[parseInt(teamStats.ppg.rank) - 1] = {
                        teamId: teamStats.teamId,
                        teamPPG: teamStats.ppg.avg,
                        rank: parseInt(teamStats.ppg.rank),
                    }
                }
            });

            $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('http://data.nba.net/10s/prod/2018/teams_config.json') + '&callback=?', {}, function(data2){
                console.log(data2);
                for(i = 0; i < teamObjectsArr.length; i++) {
                    data2.contents.teams.config.forEach(function(team) {
                        if(teamObjectsArr[i].teamId === team.teamId) {
                            teamObjectsArr[i].fullName = team.ttsName;
                            let splitOn = team.ttsName.lastIndexOf(' ');
                            teamNamesAlphaArray[i] =
                                {
                                city: team.ttsName.slice(0, splitOn),
                                nickname: team.ttsName.slice(splitOn + 1),
                                };
                        }
                    });
                }
                console.log(teamObjectsArr);
                teamNamesAlphaArray.sort((a,b) => (a.city > b.city) ? 1 : ((b.city > a.city) ? -1 : 0));
                console.log(teamNamesAlphaArray);
                database.ref().set({
                    gamesByExcitement: teamObjectsArr,
                    teams: teamNamesAlphaArray,
                });
            });
        });
    });
});