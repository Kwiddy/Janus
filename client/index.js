
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
  let submittedList = JSON.parse(body);

  document.getElementById("postedJobs").innerHTML = "<div>";

  for(let i = 0; i < submittedList.length-1; i++) {
    if (i % 2 == 0) {
      document.getElementById("postedJobs").innerHTML += "<div class='jobsEntries'> <b> " + submittedList[i] + "</b> <br>" + submittedList[i+1] + "</div>";
    }
  };

  document.getElementById("postedJobs").innerHTML += "</div>";
});

window.addEventListener('load', async function(event){
  let response = await fetch('http://127.0.0.1:8090/jobsList')
  let body = await response.text();
  let submittedList = JSON.parse(body);

  document.getElementById("postedJobs").innerHTML = "<div>";

  for(let i = 0; i < submittedList.length-1; i++) {
    if (i % 2 == 0) {
      document.getElementById("postedJobs").innerHTML += "<div class='jobsEntries'> <b> " + submittedList[i] + "</b> <br>" + submittedList[i+1] + "</div>";
    }
  };

  document.getElementById("postedJobs").innerHTML += "</div>";
});









/*
let response = await fetch('http://127.0.0.1:8090/jobsList')
let body = await response.text();
let submittedList = JSON.parse(body);

for(let i = 0; i < submittedList.length; i++) {
  var newPost = document.createElement("div");
  newPost.innerHTML = submittedList[i];
  newPost.className = "jobsEntries";
  document.body.appendChild(newPost);
};
*/
