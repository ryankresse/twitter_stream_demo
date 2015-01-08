 (function (){
'use strict';
angular
	.module('app')
	.controller('streamController', ['$http', 'StreamService', 'UnloadService', '$scope', streamController]);
	
	function streamController ($http, StreamService, UnloadService, $scope) {

		var that = this;
	
		this.searchTerms = '';
		this.exclusiveSearch = true;
		this.userNumber;
		this.coords = ['-74.367142', '40.559966', '-73.736801', '40.97081' ];
		this.userNumberString;
		this.tweets = [];
		this.searchTermArray = [];
		this.buttonText = "Start Stream";
		this.noSearchTermError = false;
		this.serverError = false;
		this.toggleImage = 'hide.png';
		this.showInstructions = true;
		this.waiting = false;

		//hids and shows the title/instruction box and swaps the image the user clicks on
		this.toggleInstructions = function () {
			that.showInstructions = !that.showInstructions;
			that.toggleImage ==='hide.png' ? that.toggleImage = 'show.png' : that.toggleImage = 'hide.png';
		};

		//when the user moves the location box, this stores the new coordinates in an array
		this.updateCoords = function (coords) {
			that.coords = coords;
			console.log(that.coords);
		};

		//makes an array of the user's search terms, which will get sent to the server
		this.makeTermArray = function (searchTerms) {
			searchTerms = searchTerms.toLowerCase();
			return searchTerms.split(' ');
		};

		//clears existing tweets when the user changes the stream
		this.emptyView = function () {
			that.tweets = [];
			that.searchTermArray = [];
		};

		//resets the view and errors when the user changes the stream
		this.reset = function() {
			that.emptyView();
			that.noSearchTermError = false;
			that.serverError = false;
		};

		//called when the server responds with a success message. Changes the button text if it's the first stream created, and displays a 'waiting for tweets message'
		this.streamSucceeded = function (searchTermArray) {
			that.buttonText === "Start Stream" ? that.buttonText = "Change Stream" : null;
			that.waiting = true;
		};

		// display error on error response from server
		this.streamFailed = function () {
			that.serverError = true;
		};

		//core functionality.
		this.createStream = function (coords, searchTerms, exclusiveSearch, userNumber) {
			// hide any errors and existing tweets
			that.reset();
			
			// we require the user to enter at least one search term
			if (!searchTerms.length) {
				that.noSearchTermError = true;
				return;
			}


			var searchTermArray = that.makeTermArray(searchTerms);
			
			// sending our request to the server to open the stream
			StreamService.createStream(coords, searchTermArray, exclusiveSearch, userNumber).then(function (response){	
				response.data === 'stream created' ? that.streamSucceeded(searchTermArray) : that.streamFailed();

			});
		};

		// when we get a tweet, we add it to the view and hide the 'waiting' message
		this.addTweet = function (tweet) {
			that.tweets.unshift(tweet);
			that.waiting = false;
		};

		// creates a random number that we'll send to the server to create a unique stream for a specific socket. This number also serves as the 'event' that signals an incoming tweet.
		this.createUserNumber = function () {
			var randomNum =  Math.random() * (100000000000 - 1) + 1;
			console.log(randomNum);
			that.userNumber = randomNum;
			that.userNumberString = String(randomNum);
			return randomNum;
		};



		//socket io connection
		var socket = io(),
	          	  user;

	    // create our random user number
	    socket.emit('join', {userNumber: that.createUserNumber()});
		
		// each socket listens for an event that matches its randomly created user number. When it gets one, it adds the tweets.
		socket.on(that.userNumberString, function(data){
	        console.log(data);
	        $scope.$apply(that.addTweet(data));
	      });
		
		// we need to tell the server to stop the stream when the user closes the page, refreshes etc.
		UnloadService.unload(that.userNumber);
	
	}



})(); 

