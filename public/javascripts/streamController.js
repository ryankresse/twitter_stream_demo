 (function (){
'use strict';
angular
	.module('app')
	.controller('streamController', ['$scope', streamController]);
	
	function streamController ($scope) {

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
		this.disconnect = false;

		//hids and shows the title/instruction box and swaps the image the user clicks on
		this.toggleInstructions = function () {
			that.showInstructions = !that.showInstructions;
			that.toggleImage ==='hide.png' ? that.toggleImage = 'show.png' : that.toggleImage = 'hide.png';
		};

		//when the user moves the location box, this stores the new coordinates in an array
		this.updateCoords = function (coords) {
			that.coords = coords;
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
			var data = {};
			data.coords = coords;
			data.searchTermArray = searchTermArray;
			data.exclusiveSearch = exclusiveSearch;
			data.userNumber = userNumber;
			socket.emit('createStream', data);
			that.streamSucceeded(searchTermArray); 
		};

		// when we get a tweet, we add it to the view and hide the 'waiting' message
		this.addTweet = function (tweet) {
			$scope.$apply(function (){
				that.tweets.unshift(tweet);
				if (that.waiting) {that.waiting = false;}
			});
		};


		//connect to socket.io
		var socket = io.connect();


	  	socket.on('incoming_tweet', function (data) {
			that.addTweet(data);
		});

		socket.on('disconnect', function () {
			that.disconnect = true;
		});

		socket.on('error', function (error) {
			console.log(error);
			that.waiting = false;
			that.serverError = true;
		});
		
		
	}



})(); 

