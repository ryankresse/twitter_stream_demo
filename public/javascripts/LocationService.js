(function (){
angular
	.module('app')
	.service('LocationService', ['$http', '$q', LocationService]);
	
	
	function LocationService ($http, $q) {
		

		this.update = function () {
		  console.log('updating location');
		  return $http.post("/updateLocation");
		};
	
		

	}		

})(); 