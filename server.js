var express = require("express");
var myParser = require("body-parser");
var app = express();

app.use(myParser.urlencoded({extended:false}));
app.use(myParser.json());
app.use(express.static("client"));

app.get('/', function(request, response) {
  response.sendFile(__dirname + "/client/index.html");
});

app.post('/index', function(request, response) {
  var employer = request.body.addEmpl;
  var jobTitle = request.body.addJob;
  console.log("Employer added: " + employer + ", offering the position of: " + jobTitle);
  response.end("yes");
});




app.listen(8090, function() {
  console.log("SERVER RUNNING ON PORT 8090");
});
