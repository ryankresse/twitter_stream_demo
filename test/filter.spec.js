describe('UT: filter.js', function() {
  var expect = require('chai').expect;
	var sinon = require('sinon');
  var filter = require('../lib/filter').filter;
  
 
    beforeEach(function(){
       
        req = {
          body: {
            searchTermArray: ['howdy', 'doody'],
            exclusiveSearch: true
          }
        };
        tweet = {
          text: "It's the howdy doody show!"
        }
        
    });


      describe('exclusiveSearch', function() {
        it('should be true', function() { 
          expect(filter(req, tweet)).to.equal(true);
        });

         it('should be false because it does not contain both words', function() { 
          tweet.text = "It's the howdy show!";
          expect(filter(req, tweet)).to.equal(false);
        });

      });

        describe('inclusiveSearch', function() {
        it('should be true', function() { 
          req.body.exclusiveSearch = false;
          expect(filter(req, tweet)).to.equal(true);
        });

         it('should be false because it does not contain either word', function() { 
          req.body.exclusiveSearch = false;
          tweet.text = "It's the how show!";
          expect(filter(req, tweet)).to.equal(false);
        });

      });

    

});

