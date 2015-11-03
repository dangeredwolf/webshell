(function(){

var os = window;
window.os = window;
var ntkapi = [];
os.storage = [];

ntkapi.useBrowserRestartForShutdown = true;

os.shuttingdown = false;
os.systemVersion = "1.0";
os.systemBuild = "8888";

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
}

})();