console.log('starting liri.js');

var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
// core node package for reading and writing files
var fs = require('fs');

//storing the user input (command line argument) to determine action
var userAction = process.argv[2];

// Twitter-Grabs the keys variables
var keys = require("./keys.js");
var keyslist = keys.twitterKeys

// stores twitterKeys from the keys file.
var client = new twitter(keys.twitterKeys);

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.------------------------------------------------------
switch (userAction) {
  case "my-tweets":
    getTweets();
    break;

  case "spotify-this-song":
  //empty variable to hold song name
    var songName = "";
    getSong();
    break;

  case "movie-this":
  //empty variable to hold movie name
  	var movieName = "";
    getMovie();
    break;

  case "do-what-it-says":
    request();
    break;
}
// That is the end of actions

//Functions------------------------------------------------------------------------------------------------
//My-Tweets function
function getTweets() {
    client.get('statuses/user_timeline', { screen_name: 'TheEllenShow', count: 20 }, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
            	console.log(tweets[i].created_at);
                console.log('%j \n', tweets[i].text);
            }
        }
    });
}
// end of Twitter function
// ---------------------------------------------------------------------------------------------------------------
//spotify-this-song function--------------------------------------------------------------------------------------
function getSong() {
    if (process.argv.length < 4) {
        songName = "Ace of Base";
        runSong();
    } else {
        songName = process.argv[3];
        runSong();
    }
} //end of getSong
// Then use spotify to get the data
function runSong() {
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
           console.log('Error occurred: ' + err);
            return;
        }
        console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name);
    });
} //end of spotify function-------------------------------------------------------------------------------------------
// movie-this function------------------------------------------------------------------------------------------------
function getMovie() {
    if (process.argv.length < 4) {
        movieName = "Mr. Nobody";
        runMovie();
    } else {
        movieName = process.argv[3];
        runMovie();
    }
} //end of getMovie

function runMovie(){
request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(error, response, body) {
  // If the request is successful
  if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Movie:" + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("Rating: " + JSON.parse(body).imdbRating);
    console.log("Production Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
  		}
	});
}
