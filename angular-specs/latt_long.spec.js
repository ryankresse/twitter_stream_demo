describe('UT: stream', function() {
    
	var scope;
  	var ctrl;
  	var $httpBackend;
    beforeEach(module('ngTouch'));
    beforeEach(module('app'));
   
	 beforeEach(inject(function($rootScope, $controller, _StreamService_, _$q_) {
    	scope = $rootScope.$new();
    	$q = _$q_
    	ctrl = $controller('streamController', {$scope: scope});
    
		StreamService = _StreamService_;
		sinon.stub(StreamService, 'createStream', function (a, b, c, d) {
			var deferred = $q.defer();
			deferred.resolve('resolved');
			return deferred.promise;
		});
  	 }));


  	 describe('testing makeTermArray', function() {
	   it('should split the string into an array of words', function() { 
	   		var array = ctrl.makeTermArray('me oh and I');
	   		expect(array).to.have.length(4);
	   		expect(array[0]).to.equal('me');
	   	});
	 });

  	 describe('testing updateLocation function call', function() {
	   it('should call the function with the appropriate agruments', function() { 
	   		ctrl.createStream(36, 22, 33, 44, 'me oh and I');
	   		expect(StreamService.createStream.calledWith(36, 22, 33, 44, ['me', 'oh', 'and', 'I'])).to.equal(true);
	   	});
	 });

	 

	/*describe('testing intial values', function() {
	   it('the function should not be called and error should be false', function() { 
	   		expect(ctrl.newContact.noNameError).to.equal(false); 
	   		expect(ContactsDataService.addContact.callCount).to.equal(0);
	   	});
	 });

	describe('handling no name input', function() {
	   it('error should be true, function should not be called', function() { 
	   		ctrl.newContact.addContact(ctrl.newContact.info);
	   		expect(ctrl.newContact.noNameError).to.equal(true); 
	   		expect(ContactsDataService.addContact.callCount).to.equal(0);
	   	});
	 });

	describe('calling add function with name input', function() {
	   it('error should be false, function should be called', function() { 
	   		ctrl.newContact.info.name = "Ryan";
	   		ctrl.newContact.addContact(ctrl.newContact.info);
	   		expect(ctrl.newContact.noNameError).to.equal(false); 
	   		expect(ContactsDataService.addContact.callCount).to.equal(1);
	   	});
	 });
*/

});

