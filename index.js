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
