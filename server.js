var express = require("express");
var myParser = require("body-parser");
var app = express();

let empList = [];
let descriptions = [];
let jobList = [];
let linkList = [];

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

app.get('/linkList', function(request, response) {
  response.send(linkList);
})

app.post('/add', function(request, response) {
  var employer = request.body.addEmpl;
  var jobTitle = request.body.addJob;
  var desc = request.body.addDesc;
  var link = request.body.addURL
  console.log("Employer: " + employer + ", Title: " + jobTitle + ", Description: " + desc + ", URL: " + link);

  empList.push(employer);
  jobList.push(jobTitle);
  descriptions.push(desc);
  linkList.push(link);

  response.end("yes");
});

app.listen(8090, function() {
  console.log("SERVER RUNNING ON PORT 8090");
});
