function onStart () {

	let addEmpl;
	let addJob;
	let addDesc;
	let addURL;

	$("#submit").click(async function () {

		addEmpl = $("#addEmpl").val();
		addJob = $("#addJob").val();
		addDesc = $("#addDesc").val();
		addURL = $("#addURL").val();

		try {

			if (addEmpl == "" && document.getElementById("addEmpl").placeholder == "Enter an Employer..." || addJob == "" || addDesc == "" || addURL == "") throw "Empty";
			if (testUrl(addURL) == false) throw "Invalid URL";
			if (addDesc.split(" ").length > 200) throw "Too Long";

			if (document.getElementById("addEmpl").placeholder != "Enter an Employer...") {

				if (addEmpl == "") {

					addEmpl = document.getElementById("addEmpl").placeholder;

				}

			}
			document.getElementById("submit").value = "Submit";
			let addImg = document.getElementById("hiddenImg").innerHTML;

			let myCol = "#";
			let chars = ["A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
			while (myCol.length != 7) {

				myCol += chars[Math.floor(Math.random() * chars.length)];

			}

			if (addImg == "") {

				addImg = "<svg width='55px' height='38px'> <rect x='10' y='0' width='35' height='35' style='fill:" + myCol + ";'/> </svg>";

			}

			document.getElementById("emptyMsg").style.display = "none";
			document.body.style.backgroundColor = "#fcfdff";

			if (document.getElementById("Gsignout").style.display == "block") {

				addEmpl += (" (verified)");

			}

			$.post("https://janusjobs.herokuapp.com/add", {addEmpl:addEmpl , addJob:addJob, addDesc:addDesc, addURL:addURL, addImg:addImg});

			let descresp = await fetch("https://janusjobs.herokuapp.com/descList");
			let jobresp = await fetch("https://janusjobs.herokuapp.com/jobList");
			let linkresp = await fetch("https://janusjobs.herokuapp.com/linkList");
			let imgresp = await fetch("https://janusjobs.herokuapp.com/imgList");
			let empresp = await fetch("https://janusjobs.herokuapp.com/empList");
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
			document.getElementById("submitEntity").reset();
			toggle_hidden("postJob");

		}
		catch(err) {

			alert("At least one input is: " + err);

		}

	});

	$("#aboutButton").click(async function () {

		if (document.getElementById("aboutButton").value == "About Janus") {

			document.getElementById("aboutButton").value = "Close";
			$(document.getElementById("aboutCol")).animate({width: "toggle"});
			$(document.getElementById("postedJobs")).animate({marginLeft: "24%"});

		}
		else {

			document.getElementById("aboutButton").style.display = "inline-block";
			document.getElementById("aboutButton").value = "About Janus";
			$(document.getElementById("aboutCol")).animate({width: "toggle"});
			$(document.getElementById("postedJobs")).animate({marginLeft: "0%"});

		}

	});

	$("#searchbtn").click(async function () {

		let descresp = await fetch("https://janusjobs.herokuapp.com/descList");
		let jobresp = await fetch("https://janusjobs.herokuapp.com/jobList");
		let linkresp = await fetch("https://janusjobs.herokuapp.com/linkList");
		let imgresp = await fetch("https://janusjobs.herokuapp.com/imgList");
		let empresp = await fetch("https://janusjobs.herokuapp.com/empList");
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

		let keyword = document.getElementById("headSearch").value;

		document.getElementById("postedJobs").innerHTML = "<div>";

		for(let i = 0; i < empList.length; i++) {

			if(empList[i].toUpperCase().includes(keyword.toUpperCase())) {

				document.getElementById("postedJobs").innerHTML += "<a href='" + linkList[i] + "' class='jobLink'> <div class='jobsEntries'> <b> " + imgList[i] + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span> </div> </a>";

			}
			else if(jobList[i].toUpperCase().includes(keyword.toUpperCase())) {

				document.getElementById("postedJobs").innerHTML += "<a href='" + linkList[i] + "' class='jobLink'> <div class='jobsEntries'> <b> " + imgList[i] + empList[i] + "</b> - " + jobList[i] + "<br> <span>" + descriptionsList[i] + "</span> </div> </a>";

			}

		}

		document.getElementById("postedJobs").innerHTML += "</div>";

		document.getElementById("headSearch").value = "";

	});

}

function toggle_hidden (div) {

	let elem = document.getElementById(div);
	$(elem).animate({height: "toggle"});

	if (div == "postJob") {

		if (document.getElementById("newJob").innerHTML == "Cancel") {

			document.getElementById("newJob").innerHTML = "Post a Job";

		}
		else {

			document.getElementById("newJob").innerHTML = "Cancel";

		}

	}

}


function loggedCheck () {

	if ($("#Gsignout").is(":visible")) {

		let name = document.getElementById("masthead").innerHTML;
		let n = name.indexOf("Logged in as");
		let autoEmpl = name.substring(n + 13, name.length);
		document.getElementById("addEmpl").placeholder = autoEmpl;

	}
	else {

		document.getElementById("addEmpl").placeholder = "Enter an Employer...";

	}

}


window.addEventListener("load", async function () {

	let descresp = await fetch("https://janusjobs.herokuapp.com/descList");
	let jobresp = await fetch("https://janusjobs.herokuapp.com/jobList");
	let linkresp = await fetch("https://janusjobs.herokuapp.com/linkList");
	let imgresp = await fetch("https://janusjobs.herokuapp.com/imgList");
	let empresp = await fetch("https://janusjobs.herokuapp.com/empList");
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
		document.body.style.backgroundColor = "#e0e0e0";

	}

});


window.addEventListener("resize", function (e) {

	let width = e.target.outerWidth;
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

document.getElementById("menubutton").onclick = function () {

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

};

function onSignin (googleUser) {

	let profile = googleUser.getBasicProfile();

	document.getElementById("hiddenImg").innerHTML = "<img src='" + profile.getImageUrl() + "' height='35' width='35' hspace='10'>";

	let id_token = googleUser.getAuthResponse().id_token;
	if(id_token) {

		document.getElementById("Gsignin").style.display = "none";
		document.getElementById("Gsignout").style.display = "block";
		document.getElementById("masthead").innerHTML += "Logged in as " + profile.getName();

	}
	loggedCheck();

}

function signOut () {

	let auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut();
	document.getElementById("Gsignin").style.display = "block";
	document.getElementById("Gsignout").style.display = "none";
	document.getElementById("postJob").style.display = "none";
	document.getElementById("newJob").innerHTML = "Post a Job";
	document.getElementById("masthead").innerHTML = "<div id='masthead'> <table style='width:100%'> <tr> <th style='width:10%'> <button id='menubutton' class='transparentButton'> <ion-icon name='reorder' size='large' style='color:white; zoom:1.6;'></ion-icon> </button> </th> <th style='width:90%'> <a class='navbar-brand' href='#' id='headerTitle'><img src='IMG_3383.PNG' id='logo' alt='logo'></a> <br></th> </tr> </table> </div>";
	document.getElementById("hiddenImg").innerHTML = "";

}

function testUrl (addUrl) {

	let format = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return format.test(addUrl);

}

document.addEventListener("DOMContentLoaded", function () {

	onStart();

});
