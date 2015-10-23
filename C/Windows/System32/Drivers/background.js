const embeddedEdition = false;

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('bios.html', {
    state:"fullscreen",
    alwaysOnTop:embeddedEdition
  });
});
