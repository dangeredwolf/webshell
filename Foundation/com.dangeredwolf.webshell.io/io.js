const embeddedEdition = false;

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('webshellapp.html', {
    state:"fullscreen",
    alwaysOnTop:embeddedEdition
  });
});
