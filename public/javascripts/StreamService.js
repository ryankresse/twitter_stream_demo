(function (){
angular
	.module('app')
	.service('StreamService', ['$http', '$q', StreamService]);
	
	
	function StreamService ($http, $q) {
		

		this.createStream = function (long1, lat1, long2, lat2, searchTermArray, exclusiveSearch) {
		  console.log('updating location');
		  console.log(searchTermArray);
		  return $http.post("/updateLocation", {location: [long1, lat1, long2, lat2], searchTermArray: searchTermArray, exclusiveSearch: exclusiveSearch});
		};
	
		

	}		

})(); 