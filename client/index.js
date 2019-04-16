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

    if (addEmpl == "" && document.getElementById("addEmpl").placeholder == "Enter an Employer..." || addJob == "" || addDesc == "" || addURL == "") {
      document.getElementById("submit").value = "Resubmit";
      alert("Please fill in all reqired fields below");
    }
    else {
      if (document.getElementById("addEmpl").placeholder != "Enter an Employer...") {
        if (addEmpl == "") {
          addEmpl = document.getElementById("addEmpl").placeholder
        }
      }
      document.getElementById("submit").value = "Submit";
      var addImg = document.getElementById("hiddenImg").innerHTML;

      var myCol = "#";
      var chars = ["A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      while (myCol.length != 7) {
        myCol += chars[Math.floor(Math.random()*chars.length)]
      }

      if (addImg == "") {
        addImg = "<svg width='55px' height='38px'> <rect x='10' y='0' width='35' height='35' style='fill:" + myCol +";'/> </svg>"
      }

      $.post("http://localhost:8090/add", {addEmpl:addEmpl , addJob:addJob, addDesc:addDesc, addURL:addURL, addImg:addImg});

      let response = await fetch('http://localhost:8090/empList');
      let descresp = await fetch('http://localhost:8090/descList');
      let jobresp = await fetch('http://localhost:8090/jobList');
      let linkresp = await fetch('http://localhost:8090/linkList');
      let imgresp = await fetch('http://localhost:8090/imgList');
      let body = await response.text();
      let descbody = await descresp.text();
      let jobbody = await jobresp.text();
      let linkbody = await linkresp.text();
      let imgbody = await imgresp.text();
      let empList = JSON.parse(body);
      let descriptionsList = JSON.parse(descbody);
      let jobList = JSON.parse(jobbody);
      let linkList = JSON.parse(linkbody);
      let imgList = JSON.parse(imgbody);

      document.getElementById("postedJobs").innerHTML = "<div>";

      for(let i = 0; i < empList.length; i++) {
          console.log("Here: " + imgList[i]);
          document.getElementById("postedJobs").innerHTML += "<a href='" + linkList[i] + "' class='jobLink'> <div class='jobsEntries'> <b> " + imgList[i] + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span> </div> </a>";
      }


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

  $("#searchbtn").click(async function() {
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
        if(empList[i].toUpperCase().includes(keyword.toUpperCase())) {
          document.getElementById("postedJobs").innerHTML += "<a href='" + linkList[i] + "' class='jobLink'> <div class='jobsEntries'> <b> " + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span> </div> </a>";
        }
        else if(jobList[i].toUpperCase().includes(keyword.toUpperCase())) {
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


function loggedCheck() {
  if ($(Gsignout).is(':visible')) {
    var name = document.getElementById("masthead").innerHTML;
    var n = name.indexOf("Logged in as");
    var autoEmpl = name.substring(n+13, (name.length)-20)
    document.getElementById("addEmpl").placeholder = autoEmpl;
  }
  else {
    document.getElementById("addEmpl").placeholder = "Enter an Employer...";
  }
}


window.addEventListener('load', async function(event){
  let response = await fetch('http://localhost:8090/empList');
  let descresp = await fetch('http://localhost:8090/descList');
  let jobresp = await fetch('http://localhost:8090/jobList');
  let linkresp = await fetch('http://localhost:8090/linkList');
  let imgresp = await fetch('http://localhost:8090/imgList');
  let body = await response.text();
  let descbody = await descresp.text();
  let jobbody = await jobresp.text();
  let linkbody = await linkresp.text();
  let imgbody = await imgresp.text();
  let empList = JSON.parse(body);
  let descriptionsList = JSON.parse(descbody);
  let jobList = JSON.parse(jobbody);
  let linkList = JSON.parse(linkbody);
  let imgList = JSON.parse(imgbody);

  document.getElementById("postedJobs").innerHTML = "<div>";

  for(let i = 0; i < empList.length; i++) {
      console.log("Here: " + imgList[i]);
      document.getElementById("postedJobs").innerHTML += "<a href='" + linkList[i] + "' class='jobLink'> <div class='jobsEntries'> <b> " + imgList[i] + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span> </div> </a>";
  }

  document.getElementById("postedJobs").innerHTML += "</div>";
});

function onSignin(googleUser) {
        var profile = googleUser.getBasicProfile();
        /*
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        document.getElementById("masthead").innerHTML += "Logged in as " + profile.getName() + "&nbsp &nbsp &nbsp";
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        */

        var imgURL = profile.getImageUrl();
        document.getElementById("hiddenImg").innerHTML = "<img src='" + imgURL + "' height='35' width='35' hspace='10'>";

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        // console.log("ID Token: " + id_token);
        document.getElementById("Gsignin").style.display = 'none';
        document.getElementById("Gsignout").style.display = 'block';
      }

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
  // console.log('User signed out.');
  });
  document.getElementById("Gsignin").style.display = 'block';
  document.getElementById("Gsignout").style.display = 'none';
  document.getElementById("postJob").style.display = 'none';
  document.getElementById("masthead").innerHTML = "<div id='masthead'> <center> <a class='navbar-brand' href='#' id='headerTitle'><img src='IMG_3383.png' id='logo'></a> </center>";
  document.getElementById("hiddenImg").innerHTML = "";

}
