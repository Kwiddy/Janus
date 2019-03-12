var express = require("express");
var myParser = require("body-parser");
var app = express();

let employersList = [];

app.use(myParser.urlencoded({extended:false}));
app.use(myParser.json());
app.use(express.static("client"));

app.get('/jobsList', function(request, response) {
  response.send(employersList);
});

app.post('/add', function(request, response) {
  var employer = request.body.addEmpl;
  var jobTitle = request.body.addJob;
  console.log("Employer: " + employer + ", Title: " + jobTitle);

  ////////////Needs to be included to add both eventually
  employersList.push(employer);

  response.end("yes");
});

app.listen(8090, function() {
  console.log("SERVER RUNNING ON PORT 8090");
});
