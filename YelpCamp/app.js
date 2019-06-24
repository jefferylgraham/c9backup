var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    session     = require("express-session"),
    app         = express(),
    seedDB      = require("./seeds.js");

require('dotenv').config();
    
    
//requiring routes
var commnentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
    
    
mongoose.connect(`mongodb+srv://grahamj78:${process.env.DB_PASS}@cluster0-9sunf.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
// seedDB();

//PASSPORT CONFIG
app.use(session ({
    secret: "Daddy loves Jelani!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commnentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, function() {
    console.log("YelpCamp server started...");
});