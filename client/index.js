
function onStart() {
  var addEmpl;
  var addJob;
  $("#submit").click(function() {
    addEmpl = $("#addEmpl").val();
    addJob = $("#addJob").val();
    $.post("http://127.0.0.1:8090/index", {addEmpl:addEmpl , addJob:addJob});
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
