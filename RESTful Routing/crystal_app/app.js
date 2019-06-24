var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    app = express();
    
// APP CONFIG
mongoose.connect("mongodb://localhost/restful_crystal_app", { useNewUrlParser: true } );
mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

var crystalSchema = new mongoose.Schema({
    name: String,
    meaning: String,
    image: String,
    healing: String,
    chakras: String,
    description: String
});

var Crystal = new mongoose.model("Crystal", crystalSchema);

//root route
app.get("/", function(req, res) {
   res.redirect("/crystals");
});

//index route
app.get("/crystals", function(req, res) {
   Crystal.find({}, function(err, crystals) {
       if(err) {
           console.log("Index route error:", err);
       } else {
           res.render("index", {crystals: crystals});
       }
   })
});

//NEW route
app.get("/crystals/new", function(req, res) {
   res.render("new"); 
});

//create route
app.post("/crystals", function(req, res) {
    var newCrystal = req.body.crystal;
    Crystal.create(newCrystal, function(err, crystal) {
        if(err) {
            res.render("/new");
        } else {
            res.redirect("/crystals");
        }
    });
});

//Show route
app.get("/crystals/:id", function(req, res) {
    var id = req.params.id;
    Crystal.findById(id, function(err, foundCrystal) {
        if(err) {
            res.redirect("/crystals");
        } else {
            res.render("show", {crystal: foundCrystal});
        }
    });
});

//edit route
app.get("/crystals/:id/edit", function(req, res) {
    var id = req.params.id;
    Crystal.findById(id, function(err, crystal) {
        if(err) {
            res.redirect("/crystals");
        } else {
            res.render("edit", {crystal: crystal});
        }
    });
});

//update route
app.put("/crystals/:id", function(req, res) {
    var id = req.params.id;
    var crystalUpdate = req.body.crystal;
    Crystal.findByIdAndUpdate(id, crystalUpdate, function(err, crystal) {
       if(err) {
           res.redirect("/crystals");
       } else {
           res.redirect("/crystals");
       }
    });
})

//delete route
app.delete("/crystals/:id", function(req, res) {
    var id = req.params.id;
   Crystal.findByIdAndRemove(id, function(err) {
       if(err) {
           res.redirect("/crystals");
       } else {
           res.redirect("/crystals");
       }
   }); 
});
    
    
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Crystal app started...");
});
    