describe('UT: stream.js', function() {
  var expect = require('chai').expect;
	var sinon = require('sinon');
  var stream = require('../lib/stream');
  var exclusiveSearchFilter = require('../lib/filter').exclusiveSearchFilter;
  var inclusiveSearchFilter = require('..//lib/filter').inclusiveSearchFilter;
  var keys = require('../lib/twitKeys');
  var Twit = require('twit');
 
    beforeEach(function(){
        T = new Twit(keys);
        req = {
          body: {
            coords: ['0', '0'],
            searchTermArray: ['howdy', 'doody'],
            userNumber: 11111,
            exclusiveSearch: 'true'
          }
        };
        res = {
          send: function (arg) {
            console.log(arg);
          }
        };
        stop = false;
       streamArray = [
          {number: '11111', 
          stream: {
            stop: function () {stop = true;}
          }
          }]

        /*searchTermArray = ['me', 'you', 'how'];
           
           exclusiveFailingText = "nope, I how include the searchterms."
           exclusivePassingText = "Me and you and how";

           inclusiveFailingText = "nope, I don't include the searchterms."
           inclusivePassingText = "no nope how";
                */
         
            

    });

    /*describe('when stream array has length, stopStream() should be called', function() {
     it('it should call the function', function() { 
        var stopStub = sinon.stub(stream, 'stopStream', function (){});
        sinon.stub(T, 'stream', function (){ return 'stream';});
        var streamArray = ['length of 1'];
        stream.createStream(req, res);
        expect(stopStub.callCount).to.equal(1);
        expect(req.body.userNumber).to.equal('stream');

      });
   });*/

     /*describe('stopOrNot', function() {
     it('it should call the stopStream function', function() { 
        //sinon.stub(stream, 'stopStream', function (){});
        var stopSpy = sinon.spy(stream, 'stopStream');
        stream.stopOrNot(3, req, res);
        expect(stopSpy.callCount).to.equal(1);
      });
   });*/


  describe('stopStream', function() {
     it('it should call the stop function and remove the item from the array', function() { 
        stream.stopStream(req, res);
        expect(streamArray).to.have.length(0);
        //expect(stop).to.equal(true);
      });
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


/*
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

      describe('testing emit tweet function', function() {
       it('it should call the io emit function with the right arguments', function() { 
         sinon.stub(io, 'emit');
           var tweet = {
            text: "Hello",
            user: {
                screen_name: "@rkresse"
            }
           };

        index.emitTweet(tweet);
        expect(io.emit.callCount).to.equal(1);
        //expect(io.emit.calledWith('tweet', { text: 'Hello', user: '@rkresse' })).to.equal(true);
        
        });
     });*/


    

});

