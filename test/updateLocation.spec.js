describe('UT: updateLocation()', function() {
    var index = require('../index');
    var expect = require('chai').expect;
	beforeEach(function(){
      
                
        searchTermArray = ['me', 'you', 'how'];
           
           exclusiveFailingText = "nope, I how include the searchterms."
           exclusivePassingText = "Me and you and how";

           inclusiveFailingText = "nope, I don't include the searchterms."
           inclusivePassingText = "no nope how";


       
    });

	/*describe('it should update the location with the proper arguments', function() {
	   it('it should update the location with the proper argument', function() { 
	   		 var yo = {
            body: {
                location: [1,2,3,4]
            }
        };
         var beep = true;
        index.updateLocation(yo, beep);
        expect(location).to.have.length(4);
	   	});
	 });*/



    describe('testing exclusiveSearchFilter()', function() {
       it('should make the passesFilter false', function() { 
        expect(index.exclusiveSearchFilter(searchTermArray, exclusiveFailingText)).to.equal(false);
        });
     });

     describe('testing exclusiveSearchFilter()', function() {
       it('should make the passesFilter true', function() { 
        expect(index.exclusiveSearchFilter(searchTermArray, exclusivePassingText)).to.equal(true);
        
        });
     });

      describe('testing inclusiveSearchFilter()', function() {
       it('should return false', function() { 
        expect(index.inclusiveSearchFilter(searchTermArray, inclusiveFailingText)).to.equal(false);
        });
     });

     describe('testing inclusiveSearchFilter()', function() {
       it('should return true', function() { 
        expect(index.inclusiveSearchFilter(searchTermArray, inclusivePassingText)).to.equal(true);
        
        });
     });

    

});

