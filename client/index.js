
function onStart() {
  var addEmpl;
  var addJob;
  $("#submit").click(function() {
    addEmpl = $("#addEmpl").val();
    addJob = $("#addJob").val();
    addDesc = $("#addDesc").val();
    $.post("http://127.0.0.1:8090/add", {addEmpl:addEmpl , addJob:addJob, addDesc:addDesc});
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

window.addEventListener('click', async function(event){

  let response = await fetch('http://127.0.0.1:8090/jobsList')
  let descresp = await fetch('http://127.0.0.1:8090/descList')
  let body = await response.text();
  let descbody = await descresp.text();
  let submittedList = JSON.parse(body);
  let descriptionsList = JSON.parse(descbody);

  document.getElementById("postedJobs").innerHTML = "<div>";

  for(let i = 0; i < submittedList.length-1; i++) {
    if (i % 2 == 0) {
      document.getElementById("postedJobs").innerHTML += "<div class='jobsEntries'> <b> " + submittedList[i] + "</b> - " + submittedList[i+1] + "<br>" + descriptionsList[i] + "</div>";;
    }
  };

  document.getElementById("postedJobs").innerHTML += "</div>";
});

window.addEventListener('load', async function(event){
  let response = await fetch('http://127.0.0.1:8090/jobsList')
  let descresp = await fetch('http://127.0.0.1:8090/descList')
  let body = await response.text();
  let descbody = await descresp.text();
  let submittedList = JSON.parse(body);
  let descriptionsList = JSON.parse(descbody);

  document.getElementById("postedJobs").innerHTML = "<div>";

  for(let i = 0; i < submittedList.length-1; i++) {
    if (i % 2 == 0) {
      document.getElementById("postedJobs").innerHTML += "<div class='jobsEntries'> <b> " + submittedList[i] + "</b> - " + submittedList[i+1] + "<br>" + descriptionsList[i] + "</div>";
    }
  };

  document.getElementById("postedJobs").innerHTML += "</div>";
});
