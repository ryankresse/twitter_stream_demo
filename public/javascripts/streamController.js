 (function (){
'use strict';
angular
	.module('app')
	.controller('streamController', ['$http', 'LocationService', streamController]);
	
	function streamController ($http, LocationService) {

		var that = this;
		
		this.location = "Charleston";
		
		this.updateLocation = function (long1, lat1, long2, lat2) {
			LocationService.update(long1, lat1, long2, lat2).then(function (err, response){
				console.log(response);	
			});
		}







		var socket = io(),
	          	  user;
		socket.on('tweet', function(data){
	        console.log(data);
	        var tweet = data.user + ": " + data.text;
	        $('.tweets').append($('<li>').text(tweet));
	      });
		

		

	}



})(); 

