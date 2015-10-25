var os = window.parent.window;
var startopened = false;

if (typeof $(".startbutton")[0] !== "undefined") {
	$(".startbutton").click(function(){
		startopened = !startopened;

		if (startopened) {
			$(".startmenubody")[0].className = "startmenubody startmenubodyopen"
		} else {
			$(".startmenubody")[0].className = "startmenubody"
		}
	});

	$("#searchbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		sendEvent({eventname:"openwindow",args:["https://google.com","Google Search",1180,720]});
	});

	$("#mcbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		sendEvent({eventname:"openwindow",args:["C/Windows/explorer.html","File Explorer"]});
	});

	$("#runbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		sendEvent({eventname:"openwindow",args:["C/Windows/System32/runas.html","Run",425,190]});
	});

	$("#shutdownbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		sendEvent({eventname:"shutdown"});
	});

	$("#lockbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		sendEvent({eventname:"lockscreen"});
	});

	$("#aboutbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		sendEvent({eventname:"openwindow",args:["C/Windows/System32/winver.html","About",600,380]});
	});

	$("#immtestbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		sendEvent({eventname:"openwindow",args:["C/Windows/System32/immersive.html","Immersive Test"]});
	});

	$("#gimmbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
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
