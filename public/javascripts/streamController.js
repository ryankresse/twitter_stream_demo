 (function (){
'use strict';
angular
	.module('app')
	.controller('streamController', ['$http', streamController]);
	
	function streamController ($http) {

		var that = this;
		this.location = "Charleston";
		var socket = io(),
	          	  user;
		socket.on('tweet', function(data){
	        console.log(data);
	        var tweet = data.user + ": " + data.text;
	        $('.tweets').append($('<li>').text(tweet));
	      });
		

	}



})(); 

