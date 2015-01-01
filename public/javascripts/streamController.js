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
		
		this.makeTermArray = function (searchTerms) {
			searchTerms = searchTerms.toLowerCase();
			return searchTerms.split(' ');
		}

		this.createStream = function (long1, lat1, long2, lat2, searchTerms, exclusiveSearch) {
			var searchTermArray = that.makeTermArray(searchTerms);
			StreamService.createStream(long1, lat1, long2, lat2, searchTermArray).then(function (err, response){
				console.log(response);	
			});
		};









		var socket = io(),
	          	  user;
		socket.on('tweet', function(data){
	        console.log(data);
	        var tweet = data.user + ": " + data.text;
	        $('.tweets').append($('<li>').text(tweet));
	      });
		

		

	}



})(); 

