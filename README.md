# Janus


## General Information
[JanusJobs](https://pip.pypa.io/en/stable/) is a job advertising site, allowing users to sign in with their Google Accounts and advertise their jobs on a message-board like site. These advertisements will have only crucial information such as employer, title, and job description, with profile images and a link to the employer's site or primary advertisement when clicked.

## Server-Side Documentation
*Note: This is a summary, for full server-side code documentation and details on the testing used please see:*

### server.js
*server.js* contains only the following code snippet:
``` javascript
const app =  require("./app");
const express = require("express");

app.listen(process.env.PORT||8090);
```
Therefore *server.js* is only listening for either the port assigned to it by the external host, in my presented application this port is therefore provided by *herokuapp*, or if not then the local port 8090.

### app.js
First in *app.js* I create the lists that will store the separate entities when required. These lists are:
``` javascript
let empList = []; //stores employers
let descriptions = []; //stores job descriptions
let jobList = []; //stores job titles
let linkList = []; //stores URLs to jobs
let imgList = []; //stores profile images
```
There are also the following GET/POST requests:
 * GET /
 * GET /auth/googleUser
 * GET /auth/google/callback
 * GET /descList
 * GET /empList
 * GET /imgList
 * GET /jobList
 * GET /linkList
 * POST /add

These are described in more detail in the full server-side code documentation (available above or through the *About Janus* section).

In brief:
 * GET /:
  * Attempts a general get request from the webpage.


 * GET /descList, /empList, /jobList, /linkList:
  * These are all entities submitted in the same form on the webpage, they are also posted at the same time. See the comments in the code above to see the content of each list.


 * GET /imgList:
  * The images in this list are supplied by the profile information from the Google API. They are the profile images accompanying each post, if no user is signed in then a random profile image is used as described in the client-side section of the documentations.


 * POST /add:
  * This POST, posts all of the above lists at the same time so that information regarding the same job are in the same index of each list.


Along with GET requests from the GOOGLE OAUTH API, I use passport to create sessions for the site, meaning that different users can be logged on to the site with their google accounts at the same time:
``` javascript
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

//User sessions control via Serialize and Deserialize
passport.serializeUser(function (user, done) {
	done(null, user);
});
passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

//Session control with ClientID and clientSecret
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
```

The code above then works with the following two GET requests to provide Google account login and authentication with integrated sessions:
``` javascript
/** Attempts a GET request from GOOGLE OAUTH API through passport
  * @name GET /auth/google
  * @path {GET} /auth/google
*/
app.get("/auth/google",
	passport.authenticate("google", { scope: ["profile"] }));

/** Attempts a GET request from GOOGLE OAUTH API Callback through passport
  * @name GET /auth/google/callback
  * @path {GET} /auth/google/callback
*/
app.get("/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/" }),
	function(req, res) {
		res.redirect("/"); //redirecting page
	});
```
The first of these GET requests returns user profile information, whereas the second occurs when call back and therefore a redirect back to the page is necessary.

## Client-Side Documentation
*Note: This is a summary, for full client-side code documentation please see:*

### Initial Loading
When the page initially loads, the page will send GET requests for entities relating to job postings, if this request returns empty lists then there will be a message telling the viewer that no jobs have been posted yet and they will be encouraged to post the first.

### Job Appearances
Once jobs have been successfully fetched, job postings will display on the page, these posting will reveal a job description when hovered over (or tapped on if on mobile). If during the creation of the job the user was signed in to their Google account, then their profile image will accompany the posting. Otherwise, a random profile image (a randomly coloured square) will appear instead as a default.

### Submitting Jobs
When posting a job, the user will need to input several details: job title, employer, job description, and a link to their page. Upon clicking "Submit", *index.js* will first check that no inputs were left blank and the URL is in a valid form. The only exception to this check is when a user is signed in, the employer name will automatically be set to their own account name, this is only a placeholder and can be changed however otherwise it will be used when the job has been posted.

### General Page Use and Navigation
In the top left of the navbar there is an "About Janus" button, this will lead to an expanding side bar giving a little information about the site and also containing links to the documentation. As the information section expands, the size of any posted jobs will reduce to accommodate.

In the top right of the navbar there are two buttons: "Post a Job" and "Sign in", the use of the job posting button is detailed in the section above. The Google sign in button will allow the user to sign into their google account, once signed in, a login message will appear under the Janus logo and the employer information will be auto filled when posting a job. Furthermore, if logged in the "Sign in" button will be replaced with a "Sign Out" to reverse the process.

All signing in is incorporated with sessions so that if a user was to sign in to their account from one location, all locations accessing the site would not also be logged on to their account. For further details please see the Server-Side documentation.

The navbar, excluding the logo and collapsible menu button, is sticky, meaning that once enough entries are on the page that scrolling is required, the buttons and search bar will remain at the top of the visible page.

### Searching Jobs
The search bar allows the user to search for jobs with any keywords or strings within the employer name or the job title. Clicking "Search All", will reveal the search results. Clicking "Search All" again when nothing is in the search bar will go back to the homepage and show all of the jobs that have been posted.

### Viewports
The webpage is designed such that no matter the size of the viewport the page should be easily readable by the user. As the screen size reduces the navbar slowly folds in on itself until a predetermined viewport size limit is reached. At this point, the search options and buttons in the navbar will disappear automatically and can be expanded again either manually by pressing the expand burger menu button or automatically by increasing the viewport size again.

## Licensing


## Known Bugs
When hovering over a posted job, the job should expand to reveal the job description, however occasionally the most recent posting will show the description as undefined. If jobs are continued to be posted after this, the description will later appear correctly after further jobs have been posted. Similarly, if the page is refreshed the description appears correctly also.
