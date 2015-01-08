(function (){
angular
	.module('app')
	.service('UnloadService', ['StreamService', UnloadService]);
	
	
	function UnloadService (StreamService) {
		//this function is run right before the page unloads, telling the server to stop the stream of tweets	
		this.unload = function (userNumber) {
			window.addEventListener('beforeunload', function (e) {
			StreamService.stopStream(userNumber).then(function (err, response){
				//a hack to stop browsers from displaying the dialog box that usually comes with hooking into the beforeunload event
				var confirmationMessage = "\o/";	
 			 (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
  			return confirmationMessage;                                //Gecko + Webkit, Safari, Chrome etc.	
			});
		});

		};
		
	
		

	}		

})(); 