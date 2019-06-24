var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);

mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var penelope = new Cat({
//   name: "Mrs. Norris",
//   age: 11,
//   temperament: "Evil"
// });

// penelope.save(function(err, cat) {
//     if(err) {
//         console.log("Something went wrong!");
//     } else {
//         console.log("We just saved a cat to the db!")
//         console.log(cat);
//     }
// });

Cat.create({
   name: "Snow White",
   age: 15,
   temperament: "Bland"
}, function(err, cat) {
    if(err) {
        console.log("Creation error:", err);
    } else {
        console.log("Cat created via create method:", cat);
    }
});

Cat.find({}, function(err, cats) {
    if(err) {
        console.log("Error:", err);
    } else {
        console.log("All cats:", cats);
    }
});
