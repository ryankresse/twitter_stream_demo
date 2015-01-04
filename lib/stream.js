var unload = require('./unload').unload;
//var index = require('../index');
//var emitTweet = index.sendTweet;
var exclusiveSearchFilter = require('./filter').exclusiveSearchFilter;
var inclusiveSearchFilter = require('./filter').inclusiveSearchFilter;
var keys = require('./twitKeys');
var Twit = require('twit');
var T = new Twit(keys);
var streamToStop,
    searchTermArray,
    passesFilter,
    userNumber;
var streamArray = [];

 function createStream (req, res) {
  console.log(req.body);
  searchTermArray = req.body.searchTermArray;

  //if (streamToStop) {
   // streamToStop.stop();
  //}
    streamArray.length ? stopStream(req, res) : null;
 
  
  
  var userNumberClone = String(req.body.userNumber);
  console.log(typeof(userNumberClone));
  req.body.userNumber = T.stream('statuses/filter', { locations: req.body.coords});
  req.body.userNumber.on('tweet', function (tweet) {
   console.log('incoming tweet');
   req.body.exclusiveSearch === true ?
      passesFilter = exclusiveSearchFilter(req.body.searchTermArray, tweet.text) :
      passesFilter = inclusiveSearchFilter(req.body.searchTermArray, tweet.text);
   
   if (passesFilter === true) {
     require('./emitTweet').emitTweet(tweet, userNumberClone);
    }

  });
  streamArray.push({number: userNumberClone, stream: req.body.userNumber});
  console.log(streamArray);
  //streamToStop = data.userNumber;
 res.send('updated');

}





function stopStream (req, res) {
   console.log('stopping stream');
   var i,
      len = streamArray.length;
      console.log(streamArray);
   if (len > 0) {
   
  
    for ( i = len - 1 ; i > -1; i--) {
      if (streamArray[i].number == String(req.body.userNumber)) {
        console.log('match');
        streamArray[i].stream.stop();
        if (req.body.unload) {
          unload(res, streamArray[i].stream);
        }
        console.log(streamArray);
        streamArray.splice(i, 1);
        console.log(streamArray);
        break;
      }
    }
  }
}


function unload (res, stream) {
  stream = null;
  res.send('stream nullified');
}


exports.stopStream = stopStream;
exports.createStream = createStream;
