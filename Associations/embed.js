var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo", {useNewUrlParser: true});

//POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = new mongoose.model("Post", postSchema);

//USER - email, name
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema]
});
var User = new mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "harry@hogwarts.edu",
//     name: "Harry Potter"
// });

// newUser.posts.push({
//   title: "How to brew polyjuice potion",
//   content: "Just kidding! Go to potions class to learn it!"
// });

// newUser.save(function(err, user) {
//   if(err) {
//       console.log(err);
//   } else {
//       console.log(user);
//   }
// });

// var newPost = new Post({
//     title: "Reflections on apples",
//     content: "They are delicious"
// });

// newPost.save(function(err, post) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Harry Potter"}, function(err, user) {
    if(err) {
        console.log(err);
    } else {
        user.posts.push({
            title: "Three things I really hate!",
            content: "Voldemort. Voldemort. Voldemort"
        });
        user.save(function(err, user) {
            if(err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});