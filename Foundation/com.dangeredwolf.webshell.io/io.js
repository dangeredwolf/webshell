const embeddedEdition = false;
const workspacesSupported = chrome.app.window.canSetVisibleOnAllWorkspaces();

chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('webshellapp.html', {
		state:"maximized",
		hidden:true,
		visibleOnAllWorkspaces:workspacesSupported,
	    alwaysOnTop:embeddedEdition
	},function(wsappui){
		wsappui.show();
		wsappui.fullscreen();
	});
});
