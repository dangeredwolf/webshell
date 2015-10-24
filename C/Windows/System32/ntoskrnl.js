(function(){

var os = window;
window.os = window;
var ntkapi = [];
os.currentUser = "User";
os.storage = [];

ntkapi.useBrowserRestartForShutdown = true;

os.shuttingdown = false;
os.bypassLockscreen = false;
os.systemVersion = "1.0";
os.systemBuild = "4800";

os.import = function(library) {
	if (library === "jquery") {
		return $;
	}
}

os.getRegistryValue = function(key,callback) {
	console.log(key);
	chrome.storage.local.get(key,callback)
}

os.setRegistryValue = function(key,value,callback) {
	var tmp = Object.create(window);
	console.log(key);
	console.log(value);
	tmp[key] = value;
	chrome.storage.local.set(tmp,callback);
}

os.filehandler = function(path,name) {
	if (!!!path.file) {
		throw new Exception("This is not a valid file");
	} else if (path.extension === "html") {
		if (typeof name === "undefined") {
			name = (/\/\w+\./).exec(path.path).toString();
			console.log(name);
			name = name.substring(1, name.length - 1);
			console.log(name);
		}
		openWindow(path.path,name);
	}
}

ntkapi.killWindowWithDelay = function(thewindow,delay) {
	setTimeout(function(){
		thewindow.className += " windowclosed";
	},delay);
}

os.shutdown = function() {
	var windows = $(".window");
	var delay = 0;
	for (var i=0; i < windows.length; i++) {
		delay = delay + 150;
		ntkapi.killWindowWithDelay(windows[i],delay);
	}

	if (ntkapi.useBrowserRestartForShutdown) {
		setTimeout(function(){
			window.close();
		},delay)
	}

	setTimeout(function(){
		$(".taskbar")[0].className = "taskbar hidden";
		$(".startmenu")[0].className = "startmenu hidden";
		setTimeout(function(){
			$(".lockscreen")[0].className = "lockscreen wallpaper";
			setTimeout(function(){
				$(".userlandload")[0].className = "userlandload";
				$(".authentication")[0].className = "authentication hidden";
				$(".authentication>.welcome")[0].className = "welcome hidden";
				$(".authentication>input")[0].className = "";
				$(".authentication>.loader")[0].className = "loader hidden";
				$("html>.wallpaper")[0].className = "wallpaper hidden";
				$(".dwm")[0].className = "dwm hidden";
				$(".taskbar")[0].className = "taskbar";
			},delay+300);
		},delay+700);
	},delay+300);
}

})();