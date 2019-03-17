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

      $.post("http://127.0.0.1:8090/add", {addEmpl:addEmpl , addJob:addJob, addDesc:addDesc, addURL:addURL});

      let response = await fetch('http://127.0.0.1:8090/empList')
      let descresp = await fetch('http://127.0.0.1:8090/descList')
      let jobresp = await fetch('http://127.0.0.1:8090/jobList')
      let linkresp = await fetch('http://127.0.0.1:8090/linkList')
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
  let response = await fetch('http://127.0.0.1:8090/empList')
  let descresp = await fetch('http://127.0.0.1:8090/descList')
  let jobresp = await fetch('http://127.0.0.1:8090/jobList')
  let linkresp = await fetch('http://127.0.0.1:8090/linkList')
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
