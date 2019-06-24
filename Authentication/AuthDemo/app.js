var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user"),
    app = express();
    
    mongoose.connect("mongodb://localhost/auth_demo_app", { useNewUrlParser: true });
    
    app.set("view engine", "ejs");
    
    app.use(bodyParser.urlencoded({extended: true})); //anytime we use a form
    app.use(require("express-session")({
        secret: "Jeff the webdev",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    
    //==================
    //ROUTES
    //==================
    app.get("/", function(req, res) {
      res.render("home");
    });
    
    app.get("/secret", isLoggedIn ,function(req, res) {
       res.render("secret"); 
    });
    
    //Auth Routes
    app.get("/register", function(req, res) {
        res.render("register");
    });
    
    app.post("/register", function(req, res) {
        User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
            if(err) {
                console.log("Register Post Error", err);
                return res.render("register");
            } else{
                passport.authenticate("local")(req, res, function() {
                   res.redirect("/secret"); 
                });
            }
        });
    });

    //LOGIN ROUTES
    //Show login form
    app.get("/login", function(req, res) {
       res.render("login"); 
    });
    
    app.post("/login", passport.authenticate("local", {
        successRedirect: "/secret",
        failureRedirect: "/login"
    }), function(req, res) {
    });
    
    //logout route
    app.get("/logout", function(req, res) {
       req.logout();
       res.redirect("/");
    });
    
    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    }
    
    app.listen(process.env.PORT, process.env.IP, function() {
       console.log("Auth Demo server started...") ;
    });