console.log('starting liri.js');

var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

// console.log('my-tweets:', keys.add(9,-2));

// Grabs the keys variables
var keys = require("./keys.js");
var keyslist = keys.twitterKeys

// Gets all of myKeys keys from the keys file.
var client = new twitter(keys.twitterKeys);

//var params = {screen_name: ''};
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

getTweets();
