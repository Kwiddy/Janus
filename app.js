//Initial Setup
var express = require("express");
var myParser = require("body-parser");
var app = express();

app.use(myParser.urlencoded({extended:false}));
app.use(myParser.json());
app.use(express.static("client"));

//Creation of Entity Lists
let empList = []; //stores employers
let descriptions = []; //stores job descriptions
let jobList = []; //stores job titles
let linkList = []; //stores URLs to jobs
let imgList = []; //stores profile images

/** Attempts a General GET request from the Webpage
  * @name GET /
  * @path {GET} /
  * @code {200} if response is successful
*/
app.get("/", (req, res) => {
	res.status(200).send("/ received");
});

/** Attempts a GET request to the list of employers from the Webpage
  * @name GET /empList
  * @path {GET} /empList
  * @code {200} if response is successful
*/
app.get("/empList", function(req, res) {
	res.status(200).send(empList);
});

/** Attempts a GET request to the list of job titles from the Webpage
  * @name GET /jobList
  * @path {GET} /jobList
  * @code {200} if response is successful
*/
app.get("/jobList", function(req, res) {
	res.status(200).send(jobList);
});

/** Attempts a GET request to the list of job descriptions from the Webpage
  * @name GET /descList
  * @path {GET} /descList
  * @code {200} if response is successful
*/
app.get("/descList", function(req, res) {
	res.status(200).send(descriptions);
});

/** Attempts a GET request for the list of links to jobs from the Webpage
  * @name GET /linkList
  * @path {GET} /linkList
  * @code {200} if response is successful
*/
app.get("/linkList", function(req, res) {
	res.status(200).send(linkList);
});

/** Attempts a GET request for the list of profile images from the Webpage
  * @name GET /imgList
  * @path {GET} /imgList
  * @code {200} if response is successful
*/
app.get("/imgList", function(req, res) {
	res.status(200).send(imgList);
});

/** Attempts a POST to the webpage, this post sends all entities:
  * employer, job title, job description, job link, and profile image.
  * @name POST /add
  * @path {POST} /add
  * @code {200} if sending is successful
*/
app.post("/add", function(req, res) {
	var employer = req.body.addEmpl;
	var jobTitle = req.body.addJob;
	var desc = req.body.addDesc;
	var link = req.body.addURL;
	var img = req.body.addImg;

	empList.push(employer);
	jobList.push(jobTitle);
	descriptions.push(desc);
	linkList.push(link);
	imgList.push(img);

	res.status(200);
	res.end("End");
});

///////////////////////////////

//Further Setup
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

//User sessions control via Serialize and Deserialize
passport.serializeUser(function (user, done) {
	done(null, user);
});
passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

//Session control with ClientID and clientSecret (Authorisation)
passport.use(new GoogleStrategy({
	clientID: "1042353776096-b40nc822i1clrtc12gc7tiu3g57hin85.apps.googleusercontent.com",
	clientSecret: "_2gzvWyy4Mt_FK6c3KyzAzex",
	callbackURL: "https://janusjobs.herokuapp.com/auth/google/callback"
	//callbackURL: "localhost:8090" //for use with local testing
},
function(accessToken, refreshToken, profile, done) {
	return done(null, {user:profile, accessToken:accessToken, refreshToken:refreshToken});
}
));

//Initialising Passport Session
app.use(passport.initialize());
app.use(passport.session());

/** Attempts a GET request from GOOGLE OAUTH API through passport
  * @name GET /auth/google
  * @path {GET} /auth/google
	* @code {302} if profile found
*/
app.get("/auth/google",
	passport.authenticate("google", { scope: ["profile"] }),
	function(req, res) {
		res.status(302);
	});

/** Attempts a GET request from GOOGLE OAUTH API Callback through passport
  * @name GET /auth/google/callback
  * @path {GET} /auth/google/callback
	* @code {302} if redirect found
*/
app.get("/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/" }),
	function(req, res) {
		res.redirect("/"); //redirecting page
		res.status(302);
	});

/////////////////////

module.exports = app;
