var express = require("express");
var app = express();

app.get("/", function(req, res) {
   res.send("Hi there, welcome to my assignment!"); 
});

app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        duck: "Quack",
        cat: "Meow",
        goldfish: "...."
    }
    res.send("The " + animal + " says '" + sounds[animal] + "'");
});

app.get("/repeat/:message/:num", function(req, res) {
    var msg = req.params.message;
    var numTimes = Number(req.params.num);
    var str = "";
    
    for(var i = 0; i < numTimes; i++) {
        str += msg + " ";
    }
    res.send(str);
});

app.get("*", function(req, res) {
   res.send("Sorry, page not found...What are you doing with your life?"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server started..."); 
});