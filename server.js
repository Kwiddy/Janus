var express = require("express");
var myParser = require("body-parser");
var app = express();

let jobs = [
  "dummy",
  "dummy 2"
];

app.use(myParser.urlencoded({extended:false}));
app.use(myParser.json());
app.use(express.static("client"));

app.get('/jobsList', function(request, response) {
  response.send(jobs);
});

app.post('/add', function(request, response) {
  var employer = request.body.addEmpl;
  var jobTitle = request.body.addJob;
  console.log("Employer added: " + employer + ", offering the position of: " + jobTitle);

  ////////////Needs to be included to add both eventually
  jobs.push(employer);

  response.end("yes");
});

app.listen(8090, function() {
  console.log("SERVER RUNNING ON PORT 8090");
});
