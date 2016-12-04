var request = require('request');
var twitter = require('twitter');
var keys = require('./keys.js');

var spotify = require('spotify');
var song;

var movie;

var fs = require('fs');

var userInput = process.argv[2];

//Twitter
if (userInput === "my-tweets"){
	var twitclient = new twitter(keys.twitterKeys);
	var params = {screen_name: 'kev_duong'};
	twitclient.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error){
			for (var i=0; i<tweets.length; i++){
				console.log(tweets[i].created_at);
				console.log(tweets[i].text);
				console.log('=================================================');
			}
		} else {
			console.log('Could not get tweets');
		}
	});
};

//Spotify
if (userInput === "spotify-this-song"){
	var songLookUp = process.argv[3];
	spotify.search({type: 'track', query: songLookUp}, function(err, data){
		if (err){
			console.log('Something went wrong we could not find your song');
			return;
		}
		var napster = data.tracks.items;

		for (var i=0; i<napster.length; i++){
			console.log("#" + (i+1));
			console.log('Artist name: ' + napster[i].artists[0].name);
			console.log('Track name: ' + napster[i].name);
			console.log('Album: ' + napster[i].album.name);
			console.log('Listen to preview: ' + napster[i].preview_url);
			console.log('=======================');
		}
	})
};

//OMDB
if (userInput === 'movie-this'){
	var movie = process.argv.slice(3).join('+');
	request('http://www.omdbapi.com/?type=movie&plot=short&tomatoes=true&t=' + movie, function(error, response, body ){
	if (!error){
		var response = JSON.parse(body);
		console.log('Title: ' + response.Title);
		console.log('Release Year: ' + response.Year);
		console.log('IMDB Rating: ' + response.imdbRating);
		console.log('Country: ' + response.Country);
		console.log('Language: ' + response.Language);
		console.log('Plot: ' + response.Plot);
		console.log('Actors: ' + response.Actors);
		console.log('Rotten tomatoes rating: ' + response.tomatoMeter);
		console.log('Rotten tomatoes Url: ' + response.tomatoURL);
	}	
	});
}

//Random Text

