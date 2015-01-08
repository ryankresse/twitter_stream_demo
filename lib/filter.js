//the user can request that each tweet they see contains all the search terms they enter, or any of them. we need different filters for each scenario--'exclusiveSearch' for matching tweets that contain all the words, 'inclusiveSearch' for matching tweets that contain any. in both functions, we loop through the array of search terms the user has entered, seeing if the tweet contains each word.



// determing which filter function to use
function filter(req, tweet) {
    var passesFilter;
    req.body.exclusiveSearch === true ?
      passesFilter = exclusiveSearchFilter(req.body.searchTermArray, tweet.text) :
      passesFilter = inclusiveSearchFilter(req.body.searchTermArray, tweet.text);
    return passesFilter;
  }


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
  exports.filter = filter;
  exports.exclusiveSearchFilter = exclusiveSearchFilter;
  exports.inclusiveSearchFilter = inclusiveSearchFilter;