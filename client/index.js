
function onStart() {
  var addEmpl;
  var addJob;
  var addDesc;
  $("#submit").click(async function() {

    toggle_hidden('postJob');

    addEmpl = $("#addEmpl").val();
    addJob = $("#addJob").val();
    addDesc = $("#addDesc").val();
    $.post("http://127.0.0.1:8090/add", {addEmpl:addEmpl , addJob:addJob, addDesc:addDesc});

    let response = await fetch('http://127.0.0.1:8090/empList')
    let descresp = await fetch('http://127.0.0.1:8090/descList')
    let jobresp = await fetch('http://127.0.0.1:8090/jobList')
    let body = await response.text();
    let descbody = await descresp.text();
    let jobbody = await jobresp.text();
    let empList = JSON.parse(body);
    let descriptionsList = JSON.parse(descbody);
    let jobList = JSON.parse(jobbody);

    document.getElementById("postedJobs").innerHTML = "<div>";

    for(let i = 0; i < empList.length; i++) {
        document.getElementById("postedJobs").innerHTML += "<div class='jobsEntries'> <b> " + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span></div>";
    };

    document.getElementById("postedJobs").innerHTML += "</div>";

  });
}

function toggle_hidden(div) {
  var elem = document.getElementById(div);
  $(elem).animate({height: 'toggle'});

  if (document.getElementById("newJob").innerHTML == "Cancel") {
    document.getElementById("newJob").innerHTML = "Post a Job";
  }
  else {
    document.getElementById("newJob").innerHTML = "Cancel";
  }
}

window.addEventListener('load', async function(event){
  let response = await fetch('http://127.0.0.1:8090/empList')
  let descresp = await fetch('http://127.0.0.1:8090/descList')
  let jobresp = await fetch('http://127.0.0.1:8090/jobList')
  let body = await response.text();
  let descbody = await descresp.text();
  let jobbody = await jobresp.text();
  let empList = JSON.parse(body);
  let descriptionsList = JSON.parse(descbody);
  let jobList = JSON.parse(body);

  document.getElementById("postedJobs").innerHTML = "<div>";

  for(let i = 0; i < empList.length; i++) {
      document.getElementById("postedJobs").innerHTML += "<div class='jobsEntries'> <b> " + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span></div>";
  };

  document.getElementById("postedJobs").innerHTML += "</div>";
});
