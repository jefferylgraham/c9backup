var express = require("express");
var request = require("request");

var app = express();

app.set("view engine", "ejs");

app.get("/", function(req,res) {
    res.render("search");
});

app.get("/results", function(req, res) {
    // res.send("Hello! It Works!")

    var query = req.query.searchTerm;
    var url = `http://omdbapi.com/?s=${query}&apikey=thewdb`;

    request(url, function(err, response, body) {
      if(!err && response.statusCode == 200) {
          var data = JSON.parse(body);
          res.render("results", {data: data});
      } 
    });
});



app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server started..."); 
});