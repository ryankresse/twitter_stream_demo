var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri'); 
var express = require('express');
var path = require('path');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
   var options = {
      root:  "public" 
    }
   
   res.sendFile("html/index.html", options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log("Sent");
    }
  });
});



app.post('/createStream', createStream);
app.post('/stopStream', stopStream);



  var keys = require('./lib/twitKeys');
  var Twit = require('twit');
  var T = new Twit(keys);
  //var stream = T.stream('statuses/filter', { locations: location});
  var streamToStop,
      searchTermArray,
      passesFilter,
      userNumber;




  



/*stream.on('tweet', function (tweet) {
      var data = {
        text: tweet.text,
        user: tweet.user.screen_name
      };
      console.log(data);
   //  io.emit('tweet', data);
});*/





  io.on('connection', function(socket) {
    console.log('connected');
    console.log(socket.id);
    socket.on('join', function (data) {
      console.log(data);
      var userString = String(data.userNumber);
      console.log(userString);
      socket.join(userString, function (err) {
        if (err) {
          console.log(err);
        }
        console.log(socket.rooms);
        console.log('hello');
      }); // We are using room of socket io
    });

    socket.on('create stream', function (data) {
      console.log(data);
      createStream(data);
    });

   




  


    /*stream.on('tweet', function (tweet) {
      var data = {
        text: tweet.text,
        user: tweet.user.screen_name
      };
      console.log(data);
     io.emit('tweet', data);
    });*/

    


  });

 function exclusiveSearchFilter (array, text) {
      var i = 0,
          len = array.length;
          text = text.toLowerCase();
      for ( ; i < len; i++) {
        if (text.indexOf(array[i]) === -1) {
          return false;
        }
      }
      return true;
  }

   function inclusiveSearchFilter (array, text) {
      var i = 0,
          len = array.length;
          text = text.toLowerCase();
          for ( ; i < len; i++) {
            if (text.indexOf(array[i]) !== -1) {
              return true;
            }
          }
        return false;
  }

var streamArray = [];

 function createStream (req, res) {
  console.log(req.body);
  searchTermArray = req.body.searchTermArray;

  //if (streamToStop) {
   // streamToStop.stop();
  //}
  stopStream(req, res);
 
  
  
  var userNumberClone = String(req.body.userNumber);
  console.log(typeof(userNumberClone));
  req.body.userNumber = T.stream('statuses/filter', { locations: req.body.coords});
  req.body.userNumber.on('tweet', function (tweet) {
   console.log('incoming tweet');
   req.body.exclusiveSearch === true ?
      passesFilter = exclusiveSearchFilter(req.body.searchTermArray, tweet.text) :
      passesFilter = inclusiveSearchFilter(req.body.searchTermArray, tweet.text);
   
   if (passesFilter === true) {
     emitTweet(tweet, userNumberClone);
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



function emitTweet (tweet, userNumberClone) {
    var info = {
       text: tweet.text,
       user: tweet.user.screen_name
     };
     console.log(info);
     console.log(userNumberClone);
     io.emit(userNumberClone, info);
     //socket.to(userNumberClone).emit('tweet', info);
  }

http.listen(3000, function(){
  console.log('listening on *:3000');
});

exports.createStream = createStream;

exports.stopStream = stopStream;
//exports.exclusiveSearchFilter = exclusiveSearchFilter;

//exports.inclusiveSearchFilter = inclusiveSearchFilter;

//exports.emitTweet = emitTweet;