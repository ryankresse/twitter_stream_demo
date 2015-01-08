var unload = require('./unload').unload,
    keys = require('./twitKeys'),
    Twit = require('twit'),   // twitter api library for Node
    T = new Twit(keys),   
    streamToStop,
    searchTermArray,
    passesFilter,
    userNumber,
    streamArray = [];
 
  // if there are no active streams, we don't run the stop stream function when the user creates a stream because there are none to stop 
  function stopOrNot(length, req, res) {
      length ? stopStream(req, res) : null;
  }

  // when we get an tweet from twitter, we pass it through our filter to check if it contains the search term(s). if so, we emit the tweet.
  function filterAndTweet(req, tweet, userNumberClone) {
   if (require('./filter').filter(req, tweet)) {
     require('./emitTweet').emitTweet(tweet, userNumberClone);
    }
  }

 
 function createStream (req, res) {
   try {
    stopOrNot(streamArray.length, req, res);

    //before we create a new stream with the client's user number, we clone it.
    var userNumberClone = String(req.body.userNumber);
    req.body.userNumber = T.stream('statuses/filter', { locations: req.body.coords});
    
    //when we receive a tweet from twitter we will pass it through and maybe emit it.
    req.body.userNumber.on('tweet', function (tweet) {
     filterAndTweet(req, tweet, userNumberClone);
    });

    //we keep all our active streams in an array of objects. The key is the client's user number and the value is the stream itself (the req.body.userNumber that we set equal to T.stream)
    streamArray.push({number: userNumberClone, stream: req.body.userNumber});
    
    //if everything goes well, we send a success message to the client  
    res.send('stream created');
  }
  catch (e) {
    console.log(e);
    res.send('error');
  }
  
}




// if a user has created a stream and then changes it, we need to stop the original stream before creating a new one.
function stopStream (req, res) {
   console.log('stopping stream');
   var i,
      len = streamArray.length;
      console.log(streamArray);
    
    //looping through our stream array, looking for a match of the user number that the client sent through. when we find one, we stop the stream and remove it from the array.
    for ( i = len - 1 ; i > -1; i--) {
      if (streamArray[i].number == String(req.body.userNumber)) {
        console.log('match');
        streamArray[i].stream.stop();
        if (req.body.unload) {
          unload(res, streamArray[i].stream);
        }
        streamArray.splice(i, 1);
        break;
      }
    }
 }

// i don't think this function really does anything. Should remove.
function unload (res, stream) {
  stream = null;
  res.send('stream nullified');
}


exports.stopStream = stopStream;
exports.createStream = createStream;
exports.stopOrNot = stopOrNot;
