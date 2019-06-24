var mongoose = require("mongoose");

var Post = require("./models/post");
var User = require("./models/user");

mongoose.connect("mongodb://localhost/blog_demo_2", {useNewUrlParser: true});

// User.create({
//     name: "Bob Belcher",
//     email: "Bob@builder.com"
// });

Post.create({
    title: "How to cook the best burger pt. 4",
    content: "Enjoy"
}, function(err, post) {
    if(err) {
        console.log(err);
    } else {
        User.findOne({name: "Bob Belcher"}, function(err, foundUser) {
            if(err) {
                console.log(err);
            } else {
                foundUser.posts.push(post);
                foundUser.save(function(err, data) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });
            }
        });
    }
});

// User.findOne({name: "Bob Belcher"}).populate("posts").exec(function(err, user) {
//   if(err) {
//       console.log(err);
//   } else {
//       console.log(user);
//   }
// });