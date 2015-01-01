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

 var location = [ '-109.379883', '-74.101194', '-109.319458',  '-74.083603'];
 console.log(location);



  var keys = require('./twitKeys');
  var Twit = require('twit');
  var T = new Twit(keys);
  //var stream = T.stream('statuses/filter', { locations: location});
  var streamToStop,
      searchTermArray;


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


 function createStream (req, res) {
  console.log(req.body);
  searchTermArray = req.body.searchTermArray;
  if (streamToStop) {
    streamToStop.stop();
  }
  newStream = T.stream('statuses/filter', { locations: req.body.location});
  newStream.on('tweet', function (tweet) {
   console.log('new');
   if (tweet.text.indexOf(req.body.searchTermArray) !== -1) {
     var data = {
       text: tweet.text,
       user: tweet.user.screen_name
     };
     console.log(data);
     io.emit('tweet', data);
    }
  });
  streamToStop = newStream;
  res.send('updated');

}



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


    /*stream.on('tweet', function (tweet) {
      var data = {
        text: tweet.text,
        user: tweet.user.screen_name
      };
      console.log(data);
     io.emit('tweet', data);
    });*/

    


  });



http.listen(3000, function(){
  console.log('listening on *:3000');
});

exports.createStream = createStream;

exports.exclusiveSearchFilter = exclusiveSearchFilter;

exports.inclusiveSearchFilter = inclusiveSearchFilter;