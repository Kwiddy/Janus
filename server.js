var express = require("express");
var myParser = require("body-parser");
var app = express();

let empList = [];
let descriptions = [];
let jobList = [];

app.use(myParser.urlencoded({extended:false}));
app.use(myParser.json());
app.use(express.static("client"));

app.get('/empList', function(request, response) {
  response.send(empList);
});

app.get('/jobList', function(request, response) {
  response.send(jobList);
});

app.get('/descList', function(request, response) {
  response.send(descriptions);
});

app.post('/add', function(request, response) {
  var employer = request.body.addEmpl;
  var jobTitle = request.body.addJob;
  var desc = request.body.addDesc;
  console.log("Employer: " + employer + ", Title: " + jobTitle + ", Description: " + desc);

  empList.push(employer);
  jobList.push(jobTitle);
  descriptions.push(desc);

  response.end("yes");
});

app.listen(8090, function() {
  console.log("SERVER RUNNING ON PORT 8090");
});
