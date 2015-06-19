var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var keys = require('./lib/twitKeys'),
	Twit = require('twit'),   // twitter api library for Node
    T = new Twit(keys);   

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', require('./lib/loadPage').loadPage);




//HANDLING SOCKET CONNECTIONS, CREATING A STREAM, AND SENDING OUT TWEETS WHEN THEY COME IN

io.on('connection', function (client) {
	console.log('client connected!');

	client.on('createStream', function (data) {
		
		// if the client already has a stream going, stop it. 
		if (client.stream) {
			console.log('stream exists!');
			client.stream.stop();
		}
		
		client.exclusiveSearch = data.exclusiveSearch;
		client.searchTermArray = data.searchTermArray;
		client.connected = false;
		
		// creating the stream
		client.stream = T.stream('statuses/filter',  {locations: data.coords});
			
		client.stream.on('tweet', function (tweet) {
			console.log('incoming tweet!');
				
			//If an incoming tweet contains the search terms, we emit it to the client 
			if (require('./lib/filter').filter(client.exclusiveSearch, client.searchTermArray, tweet)) {
				var tweetToSend = {};
				tweetToSend.user = tweet.user.screen_name;
				tweetToSend.text = tweet.text;
				console.log('emitting tweet');
				emitTweet(tweetToSend);
			}
    	});
		
		// if twitter disconnects us, we tell the client.
		client.stream.on('disconnect', function (disconnectMessage) {
			console.log('disconnected by twitter');
			client.emit('disconnect');
		});


	});
	// if the client disconnects, we stop the stream
	client.on('disconnect', function () {
		if (client.stream) {
			client.stream.stop();
		}
	});

	function emitTweet(tweet) {
		console.log('emitting tweet');
		client.emit('incoming_tweet', tweet);
	}

	

});



exports.io = io;
exports.app = app;
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});




