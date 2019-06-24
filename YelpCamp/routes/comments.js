var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//new comment route (nested route)
router.get("/new", isLoggedIn, function(req, res){
    // find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//post comment route (nested route) ~ comment create
router.post("/", isLoggedIn, function(req, res) {
   var id = req.params.id;
   Campground.findById(id, function(err, campground) {
      if(err) {
          console.log("comment post error:", err);
          res.redirect("/campgrounds");
      } else {
          Comment.create(req.body.comment, function(err, comment) {
             if(err) {
                 console.log("Comment ceation error:", err);
             }  else {
                 comment.author.id = req.user._id;
                 comment.author.username = req.user.username;
                 comment.save();
                 campground.comments.push(comment);
                 campground.save();
                 console.log(comment);
                 res.redirect("/campgrounds/" + campground._id);
             }
          });
      }
   });
});


//middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;