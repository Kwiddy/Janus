function toggle_div(id) {
  var elem = document.getElementById(id);

  if (document.getElementById("toggleAdd").innerHTML == "Hide") {
    elem.style.display = 'none';
    document.getElementById("toggleAdd").innerHTML = "Create Your Own Event!";
  }
  else {
    elem.style.display = 'block';
    document.getElementById("toggleAdd").innerHTML = "Hide";
  }
}

function CreateEvent() {
  var newEvent = document.createElement("P");
  var content = document.createTextNode(document.getElementById("host").value);

  newEvent.appendChild(content);
  document.body.appendChild(newEvent)
  newEvent.className = "CreatedEvent"
}
