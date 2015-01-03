(function (){
angular
	.module('app')
	.service('StreamService', ['$http', '$q', StreamService]);
	
	
	function StreamService ($http, $q) {
		

		this.createStream = function (coords, searchTermArray, exclusiveSearch, userNumber) {
		  console.log('creating or updating stream');
		  console.log(searchTermArray);
		  return $http.post("/createStream", {coords: coords, searchTermArray: searchTermArray, exclusiveSearch: exclusiveSearch, userNumber: userNumber});
		};

		this.stopStream = function (userNumber) {
		  console.log('closing stream');
		  return $http.post("/stopStream", {userNumber: userNumber, unload: true});
		};
	
		

	}		

})(); 