var express = require("express");
var myParser = require("body-parser");
var app = express();

let empList = [];
let descriptions = [];
let jobList = [];
let linkList = [];
let imgList = [];

app.use(myParser.urlencoded({extended:false}));
app.use(myParser.json());
app.use(express.static("client"));

app.get("/", (req, res) => {
  res.status(200).send("/ received");
});

app.get("/empList", function(req, res) {
	res.status(200).send(empList);
});

app.get("/jobList", function(req, res) {
	res.status(200).send(jobList);
});

app.get("/descList", function(req, res) {
	res.status(200).send(descriptions);
});

app.get("/linkList", function(req, res) {
	res.status(200).send(linkList);
});

app.get("/imgList", function(req, res) {
	res.status(200).send(imgList);
});

app.post("/add", function(req, res) {
	var employer = req.body.addEmpl;
	var jobTitle = req.body.addJob;
	var desc = req.body.addDesc;
	var link = req.body.addURL;
	var img = req.body.addImg;
	console.log("Employer: " + employer + ", Title: " + jobTitle + ", Description: " + desc + ", URL: " + link + ", Image: " + img);

	empList.push(employer);
	jobList.push(jobTitle);
	descriptions.push(desc);
	linkList.push(link);
	imgList.push(img);

	res.end("End");
});






///////////////////////////////
var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: 1042353776096-b40nc822i1clrtc12gc7tiu3g57hin85.apps.googleusercontent.com,
    clientSecret: _2gzvWyy4Mt_FK6c3KyzAzex,
    callbackURL: "https://janusjobs.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, expires_in, done) {
    return done(null, {user:profile, accessToken:accessToken, refreshToken:refreshToken});
  }
));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

/////////////////////









module.exports = app;
