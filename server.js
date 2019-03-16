var express = require("express");
var myParser = require("body-parser");
var app = express();

let submittedList = [];
let descriptions = [];

app.use(myParser.urlencoded({extended:false}));
app.use(myParser.json());
app.use(express.static("client"));

app.get('/jobsList', function(request, response) {
  response.send(submittedList);
});

app.get('/descList', function(request, response) {
  response.send(descriptions);
});

app.post('/add', function(request, response) {
  var employer = request.body.addEmpl;
  var jobTitle = request.body.addJob;
  var desc = request.body.addDesc;
  console.log("Employer: " + employer + ", Title: " + jobTitle + ", Description: " + desc);

  submittedList.push(employer);
  submittedList.push(jobTitle);
  descriptions.push(desc);

  response.end("yes");
});

app.listen(8090, function() {
  console.log("SERVER RUNNING ON PORT 8090");
});
