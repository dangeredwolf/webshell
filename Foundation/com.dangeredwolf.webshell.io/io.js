const workspacesSupported = chrome.app.window.canSetVisibleOnAllWorkspaces();

chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('webshellapp.html', {
		state:"maximized",
		frame:"none",
		hidden:true,
		visibleOnAllWorkspaces:workspacesSupported
	},function(wsappui){
		wsappui.show();
		wsappui.fullscreen();
	});
});