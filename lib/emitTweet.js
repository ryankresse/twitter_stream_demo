function emitTweet (tweet, userNumberClone) {
    var info = {
       text: tweet.text,
       user: tweet.user.screen_name
     };
     console.log(info);
     console.log(userNumberClone);
     require('../index').io.emit(userNumberClone, info);
     //io.emit(userNumberClone, info);
     //socket.to(userNumberClone).emit('tweet', info);
}

exports.emitTweet = emitTweet;