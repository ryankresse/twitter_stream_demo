(function (){
angular
	.module('app')
	.service('UnloadService', ['StreamService', UnloadService]);
	
	
	function UnloadService (StreamService) {
		
		this.unload = function (userNumber) {
			window.addEventListener('beforeunload', function (e) {
			console.log('unloading');
			StreamService.stopStream(userNumber).then(function (err, response){
				console.log(response);
				var confirmationMessage = "\o/";	
 			 (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
  			return confirmationMessage;                                //Gecko + Webkit, Safari, Chrome etc.	
			});
		});

		};
		
	
		

	}		

})(); 