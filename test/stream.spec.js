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

    });

  describe('stopStream', function() {
     it('it should call the stop function and remove the item from the array', function() { 
        stream.stopStream(req, res);
        expect(streamArray).to.have.length(0);
      });
   });






    

});

