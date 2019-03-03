function toggle_div(id) {
  var elem = document.getElementById(id);

  console.log(elem);

  if (elem.style.display == 'none') {
    elem.style.display = 'block';
    document.getElementById("toggleAdd").innerHTML = "Hide";
  }
  else {
    elem.style.display = 'none';
    document.getElementById("toggleAdd").innerHTML = "Add Event";
  }
}
