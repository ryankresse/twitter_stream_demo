// emitting a tweet. the name of the event that we emit is the user number of the client that we want to receive the event. they'll be listening for it specifically.

function emitTweet (tweet, userNumberClone) {
    var info = {
       text: tweet.text,
       user: tweet.user.screen_name
     };
     require('../index').io.emit(userNumberClone, info);
}

exports.emitTweet = emitTweet;