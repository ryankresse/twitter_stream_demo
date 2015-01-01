var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res){
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

router.post('/updateLocation', require('./stream').updateLocation);



module.exports = router;
