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

      document.getElementById("emptyMsg").style.display = "none";

      $.post("https://janusjobs.herokuapp.com/add", {addEmpl:addEmpl , addJob:addJob, addDesc:addDesc, addURL:addURL, addImg:addImg});

      let response = await fetch('https://janusjobs.herokuapp.com/empList')
      /*
      .then(response => response.JSON).then(function(data) {
        console.log(data);
      });
      */
      let descresp = await fetch('https://janusjobs.herokuapp.com/descList');
      let jobresp = await fetch('https://janusjobs.herokuapp.com/jobList');
      let linkresp = await fetch('https://janusjobs.herokuapp.com/linkList');
      let imgresp = await fetch('https://janusjobs.herokuapp.com/imgList');
      let empresp = await fetch('https://janusjobs.herokuapp.com/empList');
      let empbody = await empresp.text();
      let descbody = await descresp.text();
      let jobbody = await jobresp.text();
      let linkbody = await linkresp.text();
      let imgbody = await imgresp.text();
      let empList = JSON.parse(empbody);
      let descriptionsList = JSON.parse(descbody);
      let jobList = JSON.parse(jobbody);
      let linkList = JSON.parse(linkbody);
      let imgList = JSON.parse(imgbody);

      document.getElementById("postedJobs").innerHTML = "<div>";

      for(let i = 0; i < empList.length; i++) {
          document.getElementById("postedJobs").innerHTML += "<a href='" + linkList[i] + "' class='jobLink'> <div class='jobsEntries'> <b> " + imgList[i] + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span> </div> </a>";
      }


      document.getElementById("postedJobs").innerHTML += "</div>";
      document.getElementById('submitEntity').reset();
      toggle_hidden('postJob');
    }
  });

  $("#aboutButton").click(async function() {
    if (document.getElementById("aboutButton").value == "About Janus") {
      document.getElementById("aboutButton").value = "Close";
      $(document.getElementById("aboutCol")).animate({width: 'toggle'});
      $(document.getElementById("postedJobs")).animate({marginLeft: "24%"});
    }
    else {
      document.getElementById("aboutButton").style.display = "inline-block";
      document.getElementById("aboutButton").value = "About Janus";
      $(document.getElementById("aboutCol")).animate({width: 'toggle'});
      $(document.getElementById("postedJobs")).animate({marginLeft: "0%"});
    }
  });

  $("#searchbtn").click(async function() {
    let descresp = await fetch('https://janusjobs.herokuapp.com/descList');
    let jobresp = await fetch('https://janusjobs.herokuapp.com/jobList');
    let linkresp = await fetch('https://janusjobs.herokuapp.com/linkList');
    let imgresp = await fetch('https://janusjobs.herokuapp.com/imgList');
    let empresp = await fetch('https://janusjobs.herokuapp.com/empList');
    let empbody = await empresp.text();
    let descbody = await descresp.text();
    let jobbody = await jobresp.text();
    let linkbody = await linkresp.text();
    let imgbody = await imgresp.text();
    let empList = JSON.parse(empbody);
    let descriptionsList = JSON.parse(descbody);
    let jobList = JSON.parse(jobbody);
    let linkList = JSON.parse(linkbody);
    let imgList = JSON.parse(imgbody);

    var keyword = document.getElementById("headSearch").value;

    document.getElementById("postedJobs").innerHTML = "<div>";

    for(let i = 0; i < empList.length; i++) {
        if(empList[i].toUpperCase().includes(keyword.toUpperCase())) {
          document.getElementById("postedJobs").innerHTML += "<a href='" + linkList[i] + "' class='jobLink'> <div class='jobsEntries'> <b> " + imgList[i] + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span> </div> </a>";
        }
        else if(jobList[i].toUpperCase().includes(keyword.toUpperCase())) {
          document.getElementById("postedJobs").innerHTML += "<a href='" + linkList[i] + "' class='jobLink'> <div class='jobsEntries'> <b> " + imgList[i] + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span> </div> </a>";
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
  let descresp = await fetch('https://janusjobs.herokuapp.com/descList');
  let jobresp = await fetch('https://janusjobs.herokuapp.com/jobList');
  let linkresp = await fetch('https://janusjobs.herokuapp.com/linkList');
  let imgresp = await fetch('https://janusjobs.herokuapp.com/imgList');
  let empresp = await fetch('https://janusjobs.herokuapp.com/empList');
  let empbody = await empresp.text();
  let descbody = await descresp.text();
  let jobbody = await jobresp.text();
  let linkbody = await linkresp.text();
  let imgbody = await imgresp.text();
  let empList = JSON.parse(empbody);
  let descriptionsList = JSON.parse(descbody);
  let jobList = JSON.parse(jobbody);
  let linkList = JSON.parse(linkbody);
  let imgList = JSON.parse(imgbody);

  document.getElementById("postedJobs").innerHTML = "<div>";

  for(let i = 0; i < empList.length; i++) {
      document.getElementById("postedJobs").innerHTML += "<a href='" + linkList[i] + "' class='jobLink'> <div class='jobsEntries'> <b> " + imgList[i] + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span> </div> </a>";
  }

  document.getElementById("postedJobs").innerHTML += "</div>";

  if(document.getElementById("postedJobs").innerHTML == "<div></div>") {
    document.getElementById("emptyMsg").style.display = "block";
  }
});


window.addEventListener("resize", function(e) {
  width = e.target.outerWidth;
  height = e.target.outerHeight;
  if(width < 450) {
    document.getElementById("aboutButton").style.display = "none";
    document.getElementById("headSearch").style.display = "none";
    document.getElementById("searchbtn").style.display = "none";
    document.getElementById("newJob").style.display = "none";
    document.getElementById("Gsignin").style.display = "none";
    document.getElementById("Gsignout").style.display = "none";
  }
  if(width > 450) {
    document.getElementById("aboutButton").style.display = "block";
    document.getElementById("headSearch").style.display = "block";
    document.getElementById("searchbtn").style.display = "block";
    document.getElementById("newJob").style.display = "block";
    if(document.getElementById("masthead").innerHTML.includes("Logged")) {
      document.getElementById("Gsignout").style.display = "block";
    }
    else {
      document.getElementById("Gsignin").style.display = "block";
    }
  }
});

function revealMenu() {
  if(document.getElementById("aboutButton").style.display == "none") {
    document.getElementById("aboutButton").style.display = "block";
    document.getElementById("headSearch").style.display = "block";
    document.getElementById("searchbtn").style.display = "block";
    document.getElementById("newJob").style.display = "block";
    if(document.getElementById("masthead").innerHTML.includes("Logged")) {
      document.getElementById("Gsignout").style.display = "block";
    }
    else {
      document.getElementById("Gsignin").style.display = "block";
    }
  }
  else {
    if(document.getElementById("newJob").innerHTML == "Cancel") {
      toggle_hidden("postJob");
    }
    document.getElementById("aboutButton").style.display = "none";
    document.getElementById("headSearch").style.display = "none";
    document.getElementById("searchbtn").style.display = "none";
    document.getElementById("newJob").style.display = "none";
    document.getElementById("Gsignin").style.display = "none";
    document.getElementById("Gsignout").style.display = "none";
  }
}












/////////////////////////////////////////////
function onSignin(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        document.getElementById("masthead").innerHTML += "Logged in as " + profile.getName() + "&nbsp &nbsp &nbsp";
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

        var imgURL = profile.getImageUrl();
        document.getElementById("hiddenImg").innerHTML = "<img src='" + imgURL + "' height='35' width='35' hspace='10'>";

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
  document.getElementById("postJob").style.display = 'none';
  document.getElementById("newJob").innerHTML = "Post a Job";
  document.getElementById("masthead").innerHTML = "<div id='masthead'> <table style='width:100%'> <tr> <th style='width:10%'> <button id='menubutton' class='transparentButton'> <ion-icon name='reorder' size='large' style='color:white; zoom:1.6;' onclick='revealMenu();'></ion-icon> </button> </th> <th style='width:90%'> <a class='navbar-brand' href='#' id='headerTitle'><img src='https://raw.githubusercontent.com/Kwiddy/Janus/master/client/IMG_3383.PNG?token=AqIhU72BnkDZNcppFB_p5k5rb2WKRsIuks5cwGg_wA%3D%3D' id='logo' alt='logo'></a> <br></th> </tr> </table> </div>";
  document.getElementById("hiddenImg").innerHTML = "";

}
