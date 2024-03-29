// Initial Setup
require("dotenv").config();

let express = require("express");
let myParser = require("body-parser");
let app = express();

app.use(myParser.urlencoded({extended:false}));
app.use(myParser.json());
app.use(express.static("client"));

// Creation of Entity Lists
let empList = []; // stores employers
let descriptions = []; // stores job descriptions
let jobList = []; // stores job titles
let linkList = []; // stores URLs to jobs
let imgList = []; // stores profile images

/** Attempts a General GET request from the Webpage
  * @name GET /
  * @path {GET} /
  * @code {200} If response is successful then the 200 OK code is returned
*/
app.get("/", (req, res) => {

	res.status(200).send("/ received");

});

/** Attempts a GET request to the list of employers from the Webpage.
	* This list of employers may partially contain account usernames instead of inputted employers, if an account username then the item will have "(verified)" next to it when posted.
  * @name GET /empList
  * @path {GET} /empList
  * @code {200} If response is successful then the 200 OK code is returned
*/
app.get("/empList", function (req, res) {

	res.status(200).send(empList);

});

/** Attempts a GET request to the list of job titles from the Webpage
  * @name GET /jobList
  * @path {GET} /jobList
  * @code {200} If response is successful then the 200 OK code is returned
*/
app.get("/jobList", function (req, res) {

	res.status(200).send(jobList);

});

/** Attempts a GET request to the list of job descriptions from the Webpage
	* These job descriptions will be limited in size thanks to a throw error in index.js
  * @name GET /descList
  * @path {GET} /descList
  * @code {200} If response is successful then the 200 OK code is returned
*/
app.get("/descList", function (req, res) {

	res.status(200).send(descriptions);

});

/** Attempts a GET request for the list of links to jobs from the Webpage
	* Each of these URLs should be in the correct form thanks to the regex testUrl function in index.js
  * @name GET /linkList
  * @path {GET} /linkList
  * @code {200} If response is successful then the 200 OK code is returned
*/
app.get("/linkList", function (req, res) {

	res.status(200).send(linkList);

});

/** Attempts a GET request for the list of profile images from the Webpage
  * @name GET /imgList
  * @path {GET} /imgList
  * @code {200} If response is successful then the 200 OK code is returned
*/
app.get("/imgList", function (req, res) {

	res.status(200).send(imgList);

});

/** Attempts a POST to the webpage, this post sends all entities:
  * employer, job title, job description, job link, and profile image.
  * @name POST /add
  * @path {POST} /add
  * @code {200} Creates a dummy job and attempts to post, sends 200 OK code if succesful response
*/
app.post("/add", function (req, res) {

	let employer = req.body.addEmpl;
	let jobTitle = req.body.addJob;
	let desc = req.body.addDesc;
	let link = req.body.addURL;
	let img = req.body.addImg;

	empList.push(employer);
	jobList.push(jobTitle);
	descriptions.push(desc);
	linkList.push(link);
	imgList.push(img);

	res.status(200);
	res.end("End");

});

// Further Setup
let passport = require("passport");
let GoogleStrategy = require("passport-google-oauth20").Strategy;

// User sessions control via Serialize and Deserialize
passport.serializeUser(function (user, done) {

	done(null, user);

});
passport.deserializeUser(function (obj, done) {

	done(null, obj);

});

// Session control with ClientID and clientSecret (Authorisation)
passport.use(new GoogleStrategy({
	clientID: "1042353776096-b40nc822i1clrtc12gc7tiu3g57hin85.apps.googleusercontent.com",
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: process.env.CALLBACKURL
	// callbackURL: "localhost:8090" //for use with local testing
},
function (accessToken, refreshToken, profile, done) {

	return done(null, {user:profile, accessToken:accessToken, refreshToken:refreshToken});

}
));

// Initialising Passport Session
app.use(passport.initialize());
app.use(passport.session());

/** Attempts a GET request from GOOGLE OAUTH API through passport
  * @name GET /auth/google
  * @path {GET} /auth/google
	* @auth This route requires Google and Passport authentication. The google authentication is required for getting profile information and the passport authentication is used in sessions intregration as described in the server-side section of README.md
	* @code {302} If profile is found
	* @code {400} If a manual GET request for /auth/google is made, by requesting the URL in the search engine, then the Google API will return a 400 error due to redirect_uri_mistmatch. This is because the URI in the request, /auth/google/callback, does not match the URIs authorized in the OAuth client
*/
app.get("/auth/google",
	passport.authenticate("google", { scope: ["profile"] }),
	function (req, res) {

		res.status(302);

	});

/** Attempts a GET request from GOOGLE OAUTH API Callback through passport
  * @name GET /auth/google/callback
  * @path {GET} /auth/google/callback
	* @auth This route requires Google and Passport authentication, the passport integration is required for sessions integration with the site as described in the server-side section of the documentation in README.md
	* @code {302} The resource requested has been redirected to the correct URL upon callback
	* @code {400} If a manual GET request for /auth/google/callback is made, by requesting the URL in the search engine, then the Google API will return a 400 error due to invalid_request as a result of a missing required scope parameter
*/
app.get("/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/" }),
	function (req, res) {

		res.redirect("/"); // redirecting page
		res.status(302);

	});

module.exports = app;
