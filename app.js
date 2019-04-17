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

app.get('/imgList', function(request, response) {
  response.send(imgList);
})

app.post('/add', function(request, response) {
  var employer = request.body.addEmpl;
  var jobTitle = request.body.addJob;
  var desc = request.body.addDesc;
  var link = request.body.addURL;
  var img = request.body.addImg;
  console.log("Employer: " + employer + ", Title: " + jobTitle + ", Description: " + desc + ", URL: " + link + ", Image: " + img);

  empList.push(employer);
  jobList.push(jobTitle);
  descriptions.push(desc);
  linkList.push(link);
  imgList.push(img)

  response.end("yes");
});

app.listen(8090, function() {
  console.log("SERVER RUNNING ON PORT 8090");
});
