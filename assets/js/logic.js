// api-nba key: 95c03b5908msh6e8fb687b6dbef1p116477jsn8192d4a9f3b4

let teamNames = [ "Atlanta Hawks", "Boston Celtics", "Charlotte Bobcats", "Chicago Bulls", "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers", "LA Clippers", "LA Lakers", "Memphis Grizzlies", "Miami Heat", "Milwauke Bucks", "Minnesota Timberwolves", "New Jersey Nets", "New Orleans Pelicans", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards" ];

let teamObjects = [];

$(document).ready(function() {



    $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('http://data.nba.net/10s/prod/v1/2018/team_stats_rankings.json') + '&callback=?', function(data){
	console.log(data);
});
    
});