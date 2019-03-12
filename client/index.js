
function onStart() {
  var addEmpl;
  var addJob;
  $("#submit").click(function() {
    addEmpl = $("#addEmpl").val();
    addJob = $("#addJob").val();
    $.post("http://127.0.0.1:8090/add", {addEmpl:addEmpl , addJob:addJob});
  });
}

function toggle_hidden(div) {
  var elem = document.getElementById(div);

  if (document.getElementById("newJob").innerHTML == "Cancel") {
    elem.style.display = 'none';
    document.getElementById("newJob").innerHTML = "Post a Job";
  }
  else {
    elem.style.display = 'block';
    document.getElementById("newJob").innerHTML = "Cancel";
  }
}

///////BOTH addEventListener NEED TO BE REPHRASED?
window.addEventListener('click', async function(event){
  let response = await fetch('http://127.0.0.1:8090/jobsList')
  let body = await response.text();
  let jobs = JSON.parse(body);

  document.getElementById("postedJobs").innerHTML = "<ul>";

  for(let i = 0; i < jobs.length; i++) {
    document.getElementById("postedJobs").innerHTML += "<li class='jobsEntries'>" + jobs[i] + "</li>";
  }

  document.getElementById("postedJobs").innerHTML += "</ul>";
});

window.addEventListener('load', async function(event){
  let response = await fetch('http://127.0.0.1:8090/jobsList')
  let body = await response.text();
  let jobs = JSON.parse(body);

  document.getElementById("postedJobs").innerHTML = "<ul>";

  for(let i = 0; i < jobs.length; i++) {
    document.getElementById("postedJobs").innerHTML += "<li class='jobsEntries'>" + jobs[i] + "</li>";
  }

  document.getElementById("postedJobs").innerHTML += "</ul>";
});
