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