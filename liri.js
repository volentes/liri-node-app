
//Sets the requirements 
var command = process.argv[2];
var parameter = process.argv[3];
var fs = require("fs");

// Runs command to execute
execute(command, parameter);

function execute (arg,para) {

	switch (arg) {
		case "my-tweets":

			// Logs all command inputs into a log.txt file
			fs.appendFile('log.txt', arg + " " + para + ",", function(err) {
				if (err) {
					console.log(err);
				}
				else {
					console.log("Logging command line prompts");
				}
			});

			//Call function to show tweets in terminal
			showTweets();
			break;

		case "spotify-this-song":

			//Logs all command inputs into a log.txt file
			fs.appendFile('log.txt', arg + " " + para + ",", function(err) {
				if (err) {
					console.log(err);
				}
			});

			//Call function to show song info in terminal
			showSong(para);
			break;

		case "movie-this":

			//Logs all command inputs into a log.txt file
			fs.appendFile('log.txt', arg + " " + para + ",", function(err) {
				if (err) {
					console.log(err);
				}
			});

			//Call  function to show movie info in terminal
			showMovie(para);
			break;

		case "do-what-it-says":

			//Logs all command inputs into a log.txt file
			fs.appendFile('log.txt', arg + " " + para + ",", function(err) {
				if (err) {
					console.log(err);
				}
			});

			showWhatever();
			break;

		default:
			console.log("The command you entered is incorrect, try again with these commands only: 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'");
			break;
	}
}

function showTweets () {
	//Gets keys and the twitter module
	var keys = require("./keys.js");
	var twitter = require('twitter');
	var ck = keys.twitterKeys.consumer_key;
	var cs = keys.twitterKeys.consumer_secret;
	var atk = keys.twitterKeys.access_token_key;
	var ats = keys.twitterKeys.access_token_secret;

	//aunthenticate twitter
	var query = new twitter({
	  consumer_key: ck,
	  consumer_secret: cs,
	  access_token_key: atk,
	  access_token_secret: ats
	});

	//Gets the last 20 tweets
	query.get('search/tweets', {q: 'node.js'}, 
		function(error, tweets, response) {
			for (var i=1; i<11; i++) {
   				console.log("Tweet #" + i + ":" + tweets.statuses[i].text);
   			}
		});
}

function showSong(songName) {
	var Spot = require('node-spotify-api');

	//Inserts a default song if none is provided by user
	if (songName === undefined) {
		songName = "the sign";
	}

	var wordsInSong = songName.split(" ");
	songName = wordsInSong[0];

	//Loops thru each word in the song name
	for (var i = 1; i<wordsInSong.length; i++) {
		if (wordsInSong.length != 1) {
			songName = songName + "+" + wordsInSong[i];
		}
	}

	var spotify = new Spot ({
  		id: "d229fb124cad4179b69413a95cb2064c",
  		secret: "3e37cb2edc5c472386e2a718f5cf466d"
		});
 
	spotify.search({ type: 'track', query: songName, limit: 1}, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
 		else {
			console.log("Song Name: " + data.tracks.items[0].name);	
			console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
			console.log("Preview link of this song: " + data.tracks.items[0].preview_url);
			console.log("Album: " + data.tracks.items[0].album.name);
		}
	});
}

function showMovie(para) {
	var request = require("request");
	var movieName = "";

	// Set movie name to Mr Nobody if none is provided by user
	if (para === undefined) {
		para = "mr. nobody";
	}

	// Remove periods from movie titles
	para.replace(/\./g, "");
	console.log(para);

	// Split words from movie title and create an array of words
	var wordsInMovie = para.split(" ");
	

	// Loop thru each word in the movie name
	for (var i=0; i<wordsInMovie.length; i++) {
		 if (wordsInMovie.length != 1) {
		    movieName = movieName + "+" + wordsInMovie[i];
		  }
		  else {
		    movieName = para;
		  }
	}

	// Request info on movie name from omdb
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";


	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {

	    // Print movie info
	    console.log("Movie title: " + JSON.parse(body).Title);
	    console.log("Release Year: " + JSON.parse(body).Year);
	    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	    console.log("Country: " + JSON.parse(body).Country);
	    console.log("Language: " + JSON.parse(body).Language);
	    console.log("Plot: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);
	  }
	});
}

function showWhatever() {

	//get text from file
	fs.readFile('random.txt', 'utf8', function(err, data) {
				
	  			if (err) {
	  				console.log(err);
	  			}
	  			else {
					var dataArr = data.split(",");
					var comm = dataArr[0];
					var thingName = dataArr[1].replace(/"/g,"");
				}	
				execute(comm, thingName);		
			});
	
}

