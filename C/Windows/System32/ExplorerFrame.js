var os = window.parent.window;
var C = os.filesystem;
var history = [];
var forwardhistory = [];
var paths = [];
var currentpath = undefined;

function Load(path) {

	body.innerHTML = "";

	var currentpath = path;

	var back = document.createElement("a");
	back.innerHTML = "<- ";
	back.id = "explorerback";
	body.appendChild(back);

	var forward = document.createElement("a");
	forward.innerHTML = " -><br><br>";
	forward.id = "explorerforward";
	body.appendChild(forward);

	$("#explorerback").click(function(){
		if (history.length > -1) {
			currentpath = currentpath.parent;
			Load(currentpath);
			forwardhistory[forwardhistory.length+1] = history[history.length];
			history[history.length] = undefined;

		}
	});

	$("#explorerforward").click(function(){
		if (forwardhistory.length > -1) {
			Load(forwardhistory[forwardhistory.length]);
			forwardhistory[forwardhistory.length] = undefined;
		}
	});

	console.log(path)

	if (path.file) {
		os.filehandler(path);
		Load(path.parent);
		return;
	}

	console.log(path.contents.length);

	for (i = 0; i < path.contents.length; i++) {
		console.log(i);
		console.log(path.contents[i]);
		var folderpath = path[path.contents[i]];
		var load = document.createElement("a");
		load.innerHTML = path.contents[i] + "<br>";
		var rand = Math.floor(Math.random() * 9999999)
		paths[rand] = folderpath;
		load.id = "ms-explorer-" + rand;
		body.appendChild(load);
		$("#ms-explorer-" + rand).click(function() {
			console.log("clicked ms-explorer-"+rand+"!");
			Load(paths[rand]);
		});
	}

	history[history.length+1] = path;
	
}

window.body = $("body")[0];
Load(C);