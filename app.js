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

app.get('/empList', function(req, res) {
  res.send(empList);
});

app.get('/jobList', function(req, res) {
  res.send(jobList);
});

app.get('/descList', function(req, res) {
  res.send(descriptions);
});

app.get('/linkList', function(req, res) {
  res.send(linkList);
})

app.get('/imgList', function(req, res) {
  res.send(imgList);
})

app.post('/add', function(req, res) {
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
  imgList.push(img)

  res.end("yes");
});

app.listen(8090, function() {
  console.log("SERVER RUNNING ON PORT 8090");
});

module.exports = app;
