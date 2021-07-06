const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
const homeStartingContent = "It's us the last people alive in Egypt, Zombie took everything but we still fighting, If you can contact us try to reach out we need all the help we get, we must spread the news. we are trying to reach anyone and talk to anyone we tryin to make at least our word last after we die i can not write now we must keep running. ";
const aboutContent = "We are the last survivors here, all people are dead there's no one left just me and my dearest friend and my mp3 Abdel basset Hamouda songs, We try our best to stay alive, life is to quiet right ?.";
const contactContent = "We need all the help we get, we can help each other i have food and fuel and more important i'm a hard worker :') so call me maybe or just email me muhammedibraheem555@gmail.com .";
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect('mongodb+srv://admin-mio:sunrise@cluster0.vqdl4.mongodb.net/blogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const postSchema = new Schema({
  title: String,
  content: String,
});
const Post = mongoose.model('Post', postSchema);
app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  })


});
app.get("/about", function(req, res) {
  res.render("about", {
    StartingAbout: aboutContent
  });
});
app.get("/contact", function(req, res) {
  res.render("contact", {
    StartingContact: contactContent
  });
});
app.get("/compose", function(req, res) {
  res.render("compose");
});
app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });
});
app.post("/delete", function(req, res) {
  const idDelete = req.body.button;
  Post.findByIdAndRemove(idDelete, function(err) {
    if (!err) {
      console.log("successfully deleted");
    }
    res.redirect("/");
  });
});
app.get("/posts/:postId", function(req, res) {

  const requestedPostId = req.params.postId;

  Post.findOne({
    _id: requestedPostId
  }, function(err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
