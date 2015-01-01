  var io = require('./index').io;
  /*var keys = require('./twitKeys');
  var Twit = require('twit');
  var T = new Twit(keys);*/


  //var location = [ '-79.942317', '32.772787', '-79.934635' , '32.796563' ];

  exports.updateLocation = function (req, res) {
    location = req.body.location;
  }


  io.on('connection', function(socket) {

    var stream = T.stream('statuses/filter', { locations: location });

    stream.on('tweet', function (tweet) {
      var data = {
        text: tweet.text,
        user: tweet.user.screen_name
      };
      console.log(data);
     io.emit('tweet', data);
    });

  });




