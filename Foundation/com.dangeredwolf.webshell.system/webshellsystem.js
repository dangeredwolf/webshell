var os = window;
window.os = window;

os.version = "1.0";
os.build = "13102 (openshell.milestone.alpha1)";

// NOTE TO SELF: Keep function wrappers, otherwise illegal invocation error http://stackoverflow.com/questions/7213369/uncaught-typeerror-illegal-invocation-on-addeventlistener
os.sendShutdownSignal = function(){os.close()};
os.delay = function(a,b){setTimeout(a,b||500)};
os.enterKeyCode = 13;
os.randomCharConst = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","^","&","*","(",")","_","-","=","+","[","]","{","}","\\","|","'","\"",";",":","<",">",".",",","/","?","~","`"];
os.body = $(document.body);
os.root = $(window);
os.doc = $(document);
os.head = $("head");
os.html = $("html");
os._bootStatusElement = $(".bootstatus");

os.isCurrentlyShuttingDown = false;
os.storage = [];

if (CryptoJS.SHA3) {
	os.hash = CryptoJS.SHA3;
} else {
	console.log("There's no SHA3 function available yet!");
	os.delay(function(){
		os.hash = CryptoJS.SHA3;
	},50);
	os.delay(function(){
		os.hash = CryptoJS.SHA3;
	},100);
	os.delay(function(){
		os.hash = CryptoJS.SHA3;
	},150);
}

os.__killWindowWithDelay = function(selectedWindow,delayAmount) {
	os.delay(function(){
		$(selectedWindow).addClass("windowclosed");
	},delayAmount);
}

os.shutdown = function() {
	if (os.isCurrentlyShuttingDown) {
		throw "The OS is already shutting down.";
	}

	os.isCurrentlyShuttingDown = true;

	var windowList = $(".window");
	var delayAmount = 0;

	for (var i = 0; i < windowList.length; i++) {
		delayAmount += 150;
		os.__killWindowWithDelay(windowList[i],delayAmount);
	}
	
	os.delay(os.sendShutdownSignal,delayAmount)
}

os.formatMonth = function(monthString) {
	switch (monthString) {
		case "Jan":
			return "January";
		case "Feb":
			return "February";
		case "Mar":
			return "March";
		case "Apr":
			return "April";
		case "May":
			return "May";
		case "Jun":
			return "June";
		case "Jul":
			return "July";
		case "Aug":
			return "August";
		case "Sep":
			return "September";
		case "Oct":
			return "October";
		case "Nov":
			return "November";
		case "Dec":
			return "December";
		default:
			return "Month";	
	}
}

os.parseBool = function(a) {
	return a === "true";
}

os.fpsStatusParseHelper = function(fps) {
	return fps > 50 && "Doing Great!" || fps > 40 && "Doing Well!" || fps > 30 && "Doing OK!" || fps > 20 && "Doing Poorly" || "Doing Bad"
}

os.make = function(thing) {
	return $(document.createElement(thing));
}

os.randomChar = function() {
	return randomCharConst[Math.floor(Math.random() * randomCharConst.length)];
}

os.randomChars = function(charCount) {
	var randomGenChars = "";
	for (var i = 0; i < charCount; i++) {
		randomGenChars += os.randomChar();
	}

	return randomGenChars;
}

os.updateBootStatus = function(status) {
	_bootStatusElement.html(status)
}