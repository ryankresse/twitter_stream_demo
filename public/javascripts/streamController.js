 (function (){
'use strict';
angular
	.module('app')
	.controller('streamController', ['$http', 'StreamService', 'UnloadService', '$scope', streamController]);
	
	function streamController ($http, StreamService, UnloadService, $scope) {

		var that = this;
		
		this.location = "Charleston";
		this.long1;
		this.lat1;
		this.long2;
		this.lat2;
		this.searchTerms = '';
		this.exclusiveSearch = true;
		this.userNumber;
		this.coords = ['-74.367142', '40.559966', '-73.736801', '40.97081' ];
		this.userNumberString;
		this.tweets = [];
		this.searchTermArray = [];
		this.loading = true;
		this.searchTermDivider = 'and';
		this.buttonText = "Start Stream";
		this.noSearchTermError = false;
		this.serverError = false;
		this.toggleImage = 'hide.png';
		this.showInstructions = true;

		this.toggleInstructions = function () {
			that.showInstructions = !that.showInstructions;
			that.toggleImage ==='hide.png' ? that.toggleImage = 'show.png' : that.toggleImage = 'hide.png';
		};
		this.updateCoords = function (coords) {
			console.log(coords);
			that.coords = coords;
			console.log(that.coords);
		};
		this.andOrOr = function (exclusiveSearch) {
			var toReturn;
			exclusiveSearch === true ? toReturn = 'and' : toReturn = 'or';
			return toReturn;
		};

		this.notOnlyWord = function () {
			var toReturn;
			that.searchTermArray.length > 1 ? toReturn = true : toReturn = false;
			return toReturn;
		};
		this.notLastWord = function (index) {
			var toReturn;
			index < that.searchTermArray.length - 1 ? toReturn = true : toReturn = false;
			return toReturn;
		};


		this.makeTermArray = function (searchTerms) {
			searchTerms = searchTerms.toLowerCase();
			return searchTerms.split(' ');
		};

		this.emptyView = function () {
			that.tweets = [];
			that.searchTermArray = [];
			that.loading = true;
		};

		this.reset = function() {
			that.emptyView();
			that.noSearchTermError = false;
			that.serverError = false;
		};


		this.streamSucceeded = function (searchTermArray) {
			that.searchTermArray = searchTermArray;
			that.searchTermDivider = that.andOrOr(that.exclusiveSearch);
			that.buttonText === "Start Stream" ? that.buttonText = "Change Stream" : null;
		};

		this.streamFailed = function () {
			console.log('failure');
			that.serverError = true;
		};

		this.createStream = function (coords, searchTerms, exclusiveSearch, userNumber) {
			that.reset();
			if (!searchTerms.length) {
				that.noSearchTermError = true;
				return;
			}

			var searchTermArray = that.makeTermArray(searchTerms);
			console.log(coords);
			
			StreamService.createStream(coords, searchTermArray, exclusiveSearch, userNumber).then(function (response){	
				response.data === 'stream created' ? that.streamSucceeded(searchTermArray) : that.streamFailed();

			});
		};

		this.addTweet = function (tweet) {
			that.tweets.length = that.truncateTweets(that.tweets.length);
			that.tweets.unshift(tweet);
		};

		this.truncateTweets = function (length) {
			if (length === 11) {
				return 10;
			}
			return length;
		};

		this.createUserNumber = function () {
			var randomNum =  Math.random() * (100000000000 - 1) + 1;
			console.log(randomNum);
			that.userNumber = randomNum;
			that.userNumberString = String(randomNum);
			return randomNum;
		};




		var socket = io(),
	          	  user;
	    socket.emit('join', {userNumber: that.createUserNumber()});
		
		socket.on(that.userNumberString, function(data){
	        console.log(data);
	        $scope.$apply(that.addTweet(data));
	      });
		
		UnloadService.unload(that.userNumber);

		
		

	}



})(); 

