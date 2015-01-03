 (function (){
'use strict';
angular
	.module('app')
	.controller('streamController', ['$http', 'StreamService', streamController]);
	
	function streamController ($http, StreamService) {

		var that = this;
		
		this.location = "Charleston";
		this.long1;
		this.lat1;
		this.long2;
		this.lat2;
		this.searchTerms;
		this.exclusiveSearch = true;
		this.userNumber;
		this.coords = ['-74.367142', '40.559966', '-73.736801', '40.97081' ];
		this.userNumberString;

		this.updateCoords = function (coords) {
			console.log(coords);
			that.coords = coords;
			console.log(that.coords);
		}
		this.makeTermArray = function (searchTerms) {
			searchTerms = searchTerms.toLowerCase();
			return searchTerms.split(' ');
		}

		this.createStream = function (coords, searchTerms, exclusiveSearch, userNumber) {
			var searchTermArray = that.makeTermArray(searchTerms);
			//socket.emit('create stream', {coords: coords, searchTermArray: searchTermArray, exclusiveSearch: exclusiveSearch, userNumber: userNumber});
			console.log(coords);
			var searchTermArray = that.makeTermArray(searchTerms);
			StreamService.createStream(coords, searchTermArray, exclusiveSearch, userNumber).then(function (err, response){
				console.log(response);	
			});
		};







		this.createUserNumber = function () {
			var randomNum =  Math.random() * (100000000000 - 1) + 1;
			console.log(randomNum);
			that.userNumber = randomNum;
			that.userNumberString = String(randomNum);
			return randomNum;
		}

		var socket = io(),
	          	  user;
	    socket.emit('join', {userNumber: that.createUserNumber()});
		socket.on(that.userNumberString, function(data){
	        console.log(data);
	        console.log(1);
	        //var tweet = data.user + ": " + data.text;
	        //$('.tweets').append($('<li>').text(tweet));
	      });
		
		window.addEventListener('beforeunload', function (e) {
			console.log('unloading');
			StreamService.stopStream(that.userNumber).then(function (err, response){
				console.log(response);
				var confirmationMessage = "\o/";

 			 (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
  			return confirmationMessage;                                //Gecko + Webkit, Safari, Chrome etc.	
			});
		});

		
		

	}



})(); 

