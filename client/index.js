function onStart() {
  var addEmpl;
  var addJob;
  var addDesc;
  var addURL;

  $("#submit").click(async function() {
    addEmpl = $("#addEmpl").val();
    addJob = $("#addJob").val();
    addDesc = $("#addDesc").val();
    addURL = $("#addURL").val();

    if (addEmpl == "" || addJob == "" || addDesc == "" || addURL == "") {
      document.getElementById("submit").value = "Cannot leave empty - Resubmit";
    }
    else {
      document.getElementById("submit").value = "Submit";

      $.post("http://localhost:8090/add", {addEmpl:addEmpl , addJob:addJob, addDesc:addDesc, addURL:addURL});
      let response = await fetch('http://localhost:8090/empList')
      let descresp = await fetch('http://localhost:8090/descList')
      let jobresp = await fetch('http://localhost:8090/jobList')
      let linkresp = await fetch('http://localhost:8090/linkList')
      let body = await response.text();
      let descbody = await descresp.text();
      let jobbody = await jobresp.text();
      let linkbody = await linkresp.text();
      let empList = JSON.parse(body);
      let descriptionsList = JSON.parse(descbody);
      let jobList = JSON.parse(jobbody);
      let linkList = JSON.parse(linkbody);

      document.getElementById("postedJobs").innerHTML = "<div>";

      for(let i = 0; i < empList.length; i++) {
          document.getElementById("postedJobs").innerHTML += "<a href='" + linkList[i] + "' class='jobLink'> <div class='jobsEntries'> <b> " + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span> </div> </a>";
      };

      document.getElementById("postedJobs").innerHTML += "</div>";
      document.getElementById('submitEntity').reset();
      toggle_hidden('postJob');
    }
  });

  $("#refineButton").click(async function() {
    if (document.getElementById("refineButton").value == "Search Options") {
      document.getElementById("refineButton").value = "Close Options";
      $(document.getElementById("refSearch")).animate({width: 'toggle'});
      $(document.getElementById("postedJobs")).animate({marginLeft: "24%"});
    }
    else {
      document.getElementById("refineButton").style.display = "inline-block";
      document.getElementById("refineButton").value = "Search Options";
      $(document.getElementById("refSearch")).animate({width: 'toggle'});
      $(document.getElementById("postedJobs")).animate({marginLeft: "0%"});
    }
  });

  $("#searchbar").click(async function() {
    let response = await fetch('http://localhost:8090/empList')
    let descresp = await fetch('http://localhost:8090/descList')
    let jobresp = await fetch('http://localhost:8090/jobList')
    let linkresp = await fetch('http://localhost:8090/linkList')
    let body = await response.text();
    let descbody = await descresp.text();
    let jobbody = await jobresp.text();
    let linkbody = await linkresp.text();
    let empList = JSON.parse(body);
    let descriptionsList = JSON.parse(descbody);
    let jobList = JSON.parse(jobbody);
    let linkList = JSON.parse(linkbody);

    var keyword = document.getElementById("headSearch").value;

    document.getElementById("postedJobs").innerHTML = "<div>";

    for(let i = 0; i < empList.length; i++) {
        if(empList[i].includes(keyword)) {
          document.getElementById("postedJobs").innerHTML += "<a href='" + linkList[i] + "' class='jobLink'> <div class='jobsEntries'> <b> " + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span> </div> </a>";
        }
        else if(jobList[i].includes(keyword)) {
          document.getElementById("postedJobs").innerHTML += "<a href='" + linkList[i] + "' class='jobLink'> <div class='jobsEntries'> <b> " + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span> </div> </a>";
        }
    };

    document.getElementById("postedJobs").innerHTML += "</div>";

    document.getElementById("headSearch").value = "";
  });
}

function toggle_hidden(div) {
  var elem = document.getElementById(div);
  $(elem).animate({height: 'toggle'});

  if (div == "postJob") {
    if (document.getElementById("newJob").innerHTML == "Cancel") {
      document.getElementById("newJob").innerHTML = "Post a Job";
    }
    else {
      document.getElementById("newJob").innerHTML = "Cancel";
    }
  }
}

window.addEventListener('load', async function(event){
  let response = await fetch('http://localhost:8090/empList')
  let descresp = await fetch('http://localhost:8090/descList')
  let jobresp = await fetch('http://localhost:8090/jobList')
  let linkresp = await fetch('http://localhost:8090/linkList')
  let body = await response.text();
  let descbody = await descresp.text();
  let jobbody = await jobresp.text();
  let linkbody = await linkresp.text();
  let empList = JSON.parse(body);
  let descriptionsList = JSON.parse(descbody);
  let jobList = JSON.parse(jobbody);
  let linkList = JSON.parse(linkbody);

  document.getElementById("postedJobs").innerHTML = "<div>";

  for(let i = 0; i < empList.length; i++) {
      document.getElementById("postedJobs").innerHTML += "<a href='" + linkList[i] + "' class='jobLink'> <div class='jobsEntries'> <b> " + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span> </div> </a>";
  };

  document.getElementById("postedJobs").innerHTML += "</div>";
});














/////////////////////////////////////////////
function onSignin(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        document.getElementById("masthead").innerHTML += "Logged in as " + profile.getName() + "&nbsp &nbsp &nbsp";
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        document.getElementById("Gsignin").style.display = 'none';
        document.getElementById("Gsignout").style.display = 'block';
      }

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
  console.log('User signed out.');
  });
  document.getElementById("Gsignin").style.display = 'block';
  document.getElementById("Gsignout").style.display = 'none';
  document.getElementById("masthead").innerHTML = "<div id='masthead'> <center> <a class='navbar-brand' href='#' id='headerTitle'><img src='IMG_3383.png' id='logo'></a> </center>"
}
