(function (){
angular
	.module('app')
	.service('StreamService', ['$http', '$q', StreamService]);
	
	
	function StreamService ($http, $q) {
		

		this.createStream = function (coords, searchTermArray, exclusiveSearch, userNumber) {
		  return $http.post("/createStream", {coords: coords, searchTermArray: searchTermArray, exclusiveSearch: exclusiveSearch, userNumber: userNumber});
		};

		this.stopStream = function (userNumber) {
		  return $http.post("/stopStream", {userNumber: userNumber, unload: true});
		};
	
		

	}		

})(); 