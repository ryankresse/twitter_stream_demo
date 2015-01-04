exports.loadPage = function(req, res){
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
};