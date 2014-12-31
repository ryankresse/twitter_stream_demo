var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twit = require('twit');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri'); 
var express = require('express');
var path = require('path');

var T = new Twit({
    consumer_key:         'gJTiSxZCrbPVWCm42pMSXGV6A'
  , consumer_secret:      'TIy4truXE44kBZoaA83i9uH7d4pyRd8yXh5AXBuISeikeUx4qg'
  , access_token:         '64494130-HvZItj2ifBkf01jR8EShM29UqyR5WQ0TPo4Bizr8G'
  , access_token_secret:  'vbNL4qx3HSN2TyBJTlnMy3YTW5yKhXwstEMiDh3jnf5aU'
});


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

var usercount = 0;

io.on('connection', function(socket){


  //var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ];

var charleston = [ '-79.942317', '32.772787', '-79.934635' , '32.796563' ];
//31.94872, -80.270405 33.673783,-79.749756
var stream = T.stream('statuses/filter', { locations: charleston });

stream.on('tweet', function (tweet) {
  var data = {
    text: tweet.text,
    user: tweet.user.screen_name
  };
  console.log(data);
 io.emit('tweet', data);
});

  
  
 socket.on('user joined', function(user){
    console.log('user joined');
    socket.broadcast.emit('user joined', user);
  });

  socket.on('disconnect', function(){
    console.log('message received');
    usercount -= 1;
    io.emit('user left', usercount);

  });


  socket.on('chat message', function(msg){
    console.log('message received');
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('keyup', function(msg, user){
    console.log('keyup received');
    socket.broadcast.emit('keyup', msg, user);
  });


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
