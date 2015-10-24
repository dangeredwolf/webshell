window.sendEvent = function(msg,onrespond) {
	chrome.runtime.sendMessage(msg,onrespond || function(){});
}

window.onEvent = function(evnt,func) {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		if (request.eventname === evnt) {
			(func ? func : sendResponse)(request.args);
		}
	});
}

document.all = function(a) {
	document.getElementsByTagName('*')[a]
}
