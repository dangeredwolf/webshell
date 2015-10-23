var os = window.parent.window;

if (typeof $(".startbutton")[0] !== "undefined") {
	$(".startbutton").click(function(){
		//os.startmenuopen = !os.startmenuopen;
		//if (os.startmenuopen) {
		//	os.openstart();
		//} else {
		//	os.closestart();
		//}
		sendEvent({eventname:"starttoggle"},function(){})
	});
} else {
	$("#searchbutton").click(function(){
		sendEvent({eventname:"openwindow",args:["https://google.com","Google Search",1180,720]});
	});

	$("#mcbutton").click(function(){
		sendEvent({eventname:"openwindow",args:["C/Windows/explorer.html","File Explorer"]});
	});

	$("#runbutton").click(function(){
		sendEvent({eventname:"openwindow",args:["C/Windows/System32/runas.html","Run",425,190]});
	});

	$("#shutdownbutton").click(function(){
		sendEvent({eventname:"shutdown"});
	});

	$("#lockbutton").click(function(){
		sendEvent({eventname:"lockscreen"});
	});

	$("#aboutbutton").click(function(){
		sendEvent({eventname:"openwindow",args:["C/Windows/System32/winver.html","About",600,380]});
	});

	$("#immtestbutton").click(function(){
		sendEvent({eventname:"openwindow",args:["C/Windows/System32/immersive.html","Immersive Test"]});
	});

	$("#gimmbutton").click(function(){
		sendEvent({eventname:"openwindow",args:["https://google.com","",undefined,undefined,undefined,undefined,true,[
			{
				name:"googleRule",
				matches: ["https://*.google.com/*","http://*.google.com/*"],
				css: {files: ["C/Program Files/Google/Search/immersivesearch.css"]},
				js: {files: ["C/Windows/System32/rundll32.js","C/Windows/System32/shellui.js"]},
				run_at: "document_end"
			}
		],520,190]});
	});
}

var enableTimer = 0;

window.addEventListener('scroll', function() {
  clearTimeout(enableTimer);
  document.body.classList.remove('hover');

  enableTimer = setTimeout(function(){
  	document.body.classList.add('hover');
  }, 1000);
}, false);