var unload = require('./unload').unload;
var keys = require('./twitKeys');
var Twit = require('twit');
var T = new Twit(keys);
var streamToStop,
    searchTermArray,
    passesFilter,
    userNumber;
var streamArray = [];
 
  function stopOrNot(length, req, res) {
      length ? stopStream(req, res) : null;
  }

  function filterAndTweet(req, tweet, userNumberClone) {
   console.log('incoming tweet');
   console.log(req);
   if (require('./filter').filter(req, tweet)) {
     require('./emitTweet').emitTweet(tweet, userNumberClone);
    }
  }

 function createStream (req, res) {
  console.log(req.body);
  stopOrNot(streamArray.length, req, res);
  var userNumberClone = String(req.body.userNumber);
  req.body.userNumber = T.stream('statuses/filter', { locations: req.body.coords});
  req.body.userNumber.on('tweet', function (tweet) {
   filterAndTweet(req, tweet, userNumberClone);
  });
  streamArray.push({number: userNumberClone, stream: req.body.userNumber});
  console.log(streamArray);
 res.send('updated');
}





function stopStream (req, res) {
   console.log('stopping stream');
   var i,
      len = streamArray.length;
      console.log(streamArray);
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


function unload (res, stream) {
  stream = null;
  res.send('stream nullified');
}


exports.stopStream = stopStream;
exports.createStream = createStream;
exports.stopOrNot = stopOrNot;
