const debugWindowAnimations = false;
const debugAuthentication = false;
var scrollTimer = 0;
var startmenuopen = false;
var pwHash;
var pwSalt;
window.tickedNewbie = false;

os.storage.login = new IDBStore({
	dbVersion: '1',
	storeName: 'login',
	keyPath: 'id',
	autoIncrement: true,
	onStoreReady: function () {
		console.log("login store ready!");
		loadLoginData();
	}
});

function loadLoginData() {
	os.storage.login.get("passwordSalt",function(e){
		pwSalt = e ? e.value : undefined;

		if (tickedNewbie) {
			setupLogin();
		}

		if (typeof pwSalt === "undefined") {
			tickedNewbie = true;
		}

		if (typeof pwHash !== "undefined" && typeof pwSalt !== "undefined") {
			initLockscreen();
		}
	});
	os.storage.login.get("passwordHash",function(e){
		pwHash = e ? e.value : undefined;

		if (tickedNewbie) {
			setupLogin();
		}

		if (typeof pwHash === "undefined") {
			tickedNewbie = true;
		}

		if (typeof pwHash !== "undefined" && typeof pwSalt !== "undefined") {
			initLockscreen();
		}
	});
}

function FormatMonth(monthstring) {
	switch (monthstring) {
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

function initShell() {
	lockscreenTimeUpdate();
	initShellEvents();
}

function lockscreenTimeUpdate() {

	if (!!$(".lockscreenopened")[0]) {
		console.log("well bye");
		return;
	}

	var thedate = new Date();
	var parsetime = thedate.toTimeString().split(":");
	var parsedate = thedate.toDateString().split(" ")
	var month = FormatMonth(parsedate[1]);
	var timenode = $(".lockscreentime.time")[0];

	timenode.innerHTML = parsetime[0] + ":" + parsetime[1] + "<div class='lockscreendate'>" + parsedate[2] + " " + month + "</div>";

	setTimeout(lockscreenTimeUpdate,2000);
}

function lockDeviceScreen() {
	$(".lockscreen")[0].className = "lockscreen wallpaper";

	$(".authentication input")[0].focus();
		
	setTimeout(function(){
		document.body.className = "";
		$("html>body>.wallpaper:not(.lockscreen)")[0].className = "wallpaper hidden"
	},400);
	lockscreenTimeUpdate();
}

function parseBool(a) {
	return a === "true";
}

function testLogin() {
	if (!pwHash) {
		throw "The account storage container for this user has not been set up";
		$(".authentication div")[0].innerHTML = "Something happened";
	}

	if (CryptoJS.SHA3($(".authentication input")[0].value + pwSalt + "") + "" === pwHash + "") {
		$(".lockscreen")[0].className = "lockscreen lockscreenopened wallpaper hidden";
		login();
	} else {
		$(".authentication div")[0].innerHTML = "Incorrect Password";

		setTimeout(function(){
			$(".authentication div")[0].innerHTML = "Hey, User!";
		},1500)
	}
}

function login() {
	startShellExperienceHost();

	$(".dwm")[0].className = "dwm";
	document.body.className += "bodyperspective";
	$(".wallpaper.hidden:not(.lockscreen)")[0].className = "wallpaper";
	$(".authentication input")[0].value = "";
	$("html>.wallpaper").on("mousedown", function(){
		unfocusWindows();
		closestart();
		console.log("click wallpaper!!!!!!");
	});
}

function linkWindow(awindow) {
	awindow.onmousedown = function(){
		awindow.className = awindow.className.replace(" windowunfocussed","");
		unfocusWindows();
		awindow.className = awindow.className.replace("windowunfocussed","");
	};
}

function unfocusWindows() {
	var a = $(".window:not(.windowunfocussed)");
	for (var i=0; i < a.length; i++) {
		a[i].className += " windowunfocussed";
	}
	closestart();
}

function initShellEvents() {

	window.openstart = function() {
		$(".startmenubody")[0].className = "startmenubody startmenubodyopen";
		startmenuopen = true;
		console.log("open!");
	}

	window.closestart = function() {
		$(".startmenubody")[0].className = "startmenubody";
		startmenuopen = false;
		console.log("close!");
	}

	window.onEvent("openwindow",function(args){
		console.log(args);
		openWindow(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10],args[11],args[12]);
	});

	window.onEvent("shutdown",function(args){
		os.shutdown();
	});

	window.onEvent("lockscreen",function(args){
		lockDeviceScreen();
	});

	window.onEvent("starttoggle",function(){
		startmenuopen = !startmenuopen;
		if (startmenuopen) {
			openstart();
		} else {
			closestart();
		}
	})

	window.addEventListener('scroll', function() { // This is for potential performance benefits by reducing paint cycles needed while scrolling
	  clearTimeout(scrollTimer);
	  document.body.classList.remove('hover');

	  scrollTimer = setTimeout(function(){
	  	document.body.classList.add('hover');
	  }, 1000);
	}, false);

	$(".watermark")[0].innerHTML = "WebShell Version " + os.systemVersion + "<br>Experimental Copy. Build " + os.systemBuild;

	$(".authentication input")[0].focus();
}

function generateRandomCharacter() {
	var chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","^","&","*","(",")","_","-","=","+","[","]","{","}","\\","|","'","\"",";",":","<",">",".",",","/","?","~","`"];
	var randomNumber = Math.floor(Math.random() * chars.length);
	return chars[randomNumber];
}

function generateRandomCharacters(num) {
	var randomChars = "";
	for (var i=0; i < num; i++) {
		randomChars += generateRandomCharacter();
	}

	return randomChars;
}

function setupLogin() {
	
	$(".authentication div")[0].innerHTML = "Let's set up your account. Enter a new password.";
	os.setupPass = undefined;
	os.confirmPass = undefined;

	$(".authentication input").keypress(function(e){

		if (os.savedCredentialsJustNow) {
			return;
		}

		if (e.charCode === 13) {
			console.log("eep");
			console.log(os.setupPass);
			if (typeof os.setupPass === "undefined") {
				console.log("shit");
				os.setupPass = $(".authentication input")[0].value+"";
				console.log($(".authentication input")[0].value+"");
				$(".authentication div")[0].innerHTML = "Enter your password one more time.";
				$(".authentication input")[0].value = "";
				console.log(os.setupPass);
			} else {
				os.confirmPass = $(".authentication input")[0].value;
				if (os.confirmPass !== os.setupPass) {
					$(".authentication input")[0].value = "";
					$(".authentication div")[0].innerHTML = "Password mismatch, enter a new password.";
					os.setupPass = undefined;
					os.confirmPass = undefined;
				} else {
					saveCredentials(os.setupPass);
					return;
				}
				
			}
		}
	});

	setTimeout(function(){$(".lockscreen")[0].className = "lockscreen wallpaper"},300);

}

function saveCredentials(setupPass) {
	$(".authentication div")[0].innerHTML = "Saving credentials...";
	var salt = generateRandomCharacters(100);
	var hash = CryptoJS.SHA3(setupPass + salt) + "";
	$(".authentication input")[0].value = "";

	console.log("hash: " + hash + ", salt: " + salt)

	if (debugAuthentication) {
		$(".authentication div")[0].innerHTML = "DEBUG!!!!!!! hash: " + hash + ", salt: " + salt;
	}

	os.storage.login.put({"id":"passwordSalt","value":salt});
	os.storage.login.put({"id":"passwordHash","value":hash});
	os.setupPass = undefined;
	os.confirmPass = undefined;
	$(".authentication input")[0].value = "";
	$(".authentication div")[0].innerHTML = "You may now log in!";

	os.savedCredentialsJustNow = true;

	initLockscreen();

	return;
}

function initLockscreen() {

	$(".authentication input").keypress(function(e){
		if (e.charCode === 13) {
			testLogin();
		}
	});

	if (bypassLockscreen) {
		setTimeout(function(){
			$(".lockscreen")[0].className = "lockscreen lockscreenopened wallpaper";
		},300);

		setTimeout(function(){
			testLogin();
		},500);
	}

	setTimeout(function(){$(".lockscreen.hidewallpaper")[0].className = "lockscreen wallpaper"},300);
}

function openWindow(url,title,sizex,sizey,posx,posy,immersive,extracontent,dragleft,dragright) {

	if (shuttingdown) {
		throw "Failed to open window because we're shutting down";
		return;
	}

	console.log(extracontent);

	var url = !url ? "https://www.google.com//%//%" : url;

	var windowwidth = sizex || 800;
	var windowheight = sizey || 500;
	var windowid = Math.floor(Math.random() * 999999999999999);
	

	console.log(immersive + " immersive")

	unfocusWindows();

	var div = document.createElement("div");
	div.className="window draggable resizable windownative windowclosed hidden";
	div.id = windowid;
	div.style.left = (posx || $(window).width() / 2 - windowwidth / 2) + "px";
	div.style.top = (posy || $(window).height() / 2 - windowheight / 2) + "px";

	var windowcontrols = document.createElement("div");
	windowcontrols.className = "windowcontrols";

	div.appendChild(windowcontrols);

	var minimise = document.createElement("button");
	minimise.className = "windowcontrol min";
	minimise.innerHTML = "&#xE15B";
	windowcontrols.appendChild(minimise);

	var draghandle = document.createElement("div");
	draghandle.className = "windowdraghandle";
	div.appendChild(draghandle);

	if (!!dragleft || !!dragright) {
		draghandle.setAttribute("style","left:" + (dragleft ? dragleft : 0) + "px;right:" + (dragright ? dragright : 150) + "px")
	}

	console.log(dragleft)

	var maximise = document.createElement("button");
	maximise.className = "windowcontrol max";
	maximise.innerHTML = "&#xE3C6";
	windowcontrols.appendChild(maximise);

	var close = document.createElement("button");
	close.className = "windowcontrol close";
	close.innerHTML = "&#xE5CD";
	windowcontrols.appendChild(close);

	var windowtitle = document.createElement("div");
	windowtitle.className = "windowtitle";
	windowtitle.innerHTML = title || "Window";
	div.appendChild(windowtitle);

	var webview = document.createElement("webview");
	webview.partition = "persist:system";
	webview.style.height = windowheight + "px";
	webview.style.width = windowwidth + "px";
	webview.className = "windowbody";
	div.appendChild(webview);

	if (!!extracontent) {
		webview.addContentScripts(extracontent);
	}

	linkWindow(div);

	$(".dwm")[0].appendChild(div);

	webview.setUserAgentOverride(navigator.userAgent.replace(/Chrome\/\d+/g,"Chrome/99") + " WebShell/" + systemVersion + "." + systemBuild);

	webview.src = url;

	webview.addEventListener("contentload",function() {
		
		webview.executeScript({code:"document.querySelector('meta[name=\"Immersive\"]').content"},function(e){
			if (parseBool(e[0]) || immersive) {
				immersive = true;
				$(".window#" + windowid).draggable({iframeFix:true,cancel:'webview',create:function(e){console.log(e);},start:function(e,ui) {if (e.offsetY > 24) {e.preventDefault();}}});
				console.log("Immersive drag props");
			} else if (!immersive) {
				$(".window#" + windowid).draggable({iframeFix:true,cancel:'webview',stack:".window"});
				console.log("No immersive drag props");
			}

			setTimeout(function(){
				div.className = "window draggable resizable windownative";

				//if (immersive) {
					div.className += " immersive";
				//}
			},300)
		});

		if (!!extracontent) {
			webview.addContentScripts(extracontent);
		}
	});

	webview.addEventListener('newwindow', function(e) {
		openWindow(e.targetUrl,e.name,e.initialWidth,e.initialHeight);
	});

	webview.addEventListener('close', function(e) {
		webview.parentElement.className += " windowclosed";
		if (!debugWindowAnimations) {
			setTimeout(function(){
				webview.parentElement.remove();
			},1000)
		}
	});

	webview.addEventListener('unresponsive', function(e) {
		webview.className = (webview.className || "") + " unresponsive";
	});

	webview.addEventListener('responsive', function(e) {
		webview.className = webview.className.replace(" unresponsive","");
	});

	$(".window#" + windowid).resizable().on("resize",function(e,ui){
		console.log("??!w12312312");
		if (ui.originalSize.width !== ui.size.width && ui.originalSize.height !== ui.size.height) {
			webview.style.width = div.style.width;
			webview.style.height = (parseInt(div.style.height.match(/\d+/g)) - (!!immersive ? 0 : 20)) + "px";
		} else if (ui.originalSize.width !== ui.size.width) {
			webview.style.width = div.style.width;
			div.style.height = webview.style.height;
		} else if (ui.originalSize.height !== ui.size.height) {
			webview.style.height = (parseInt(div.style.height.match(/\d+/g)) - (!!immersive ? 0 : 20)) + "px";
			div.style.width = webview.style.width;
		}
	});

	$(".window#" + windowid + " .windowcontrol.close").click(function(data,handler){
		webview.executeScript({code:"window.close();"},function(e){console.log(e)});
	});

}

function startShellExperienceHost() {
	var startopened = false;

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
		openWindow("https://google.com","Google Search",1180,720);
	});

	$("#mcbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		openWindow("C/Windows/explorer.html","File Explorer");
	});

	$("#runbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		openWindow("C/Windows/System32/runas.html","Run",425,190);
	});

	$("#shutdownbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		os.shutdown();
	});

	$("#lockbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		lockDeviceScreen();
	});

	$("#aboutbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		openWindow("C/Windows/System32/winver.html","About",600,380);
	});

	$("#immtestbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		openWindow("C/Windows/System32/immersive.html","Immersive Test");
	});

	$("#gimmbutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		openWindow("https://google.com","",undefined,undefined,undefined,undefined,true,[
			{
				name:"googleRule",
				matches: ["https://*.google.com/*","http://*.google.com/*"],
				css: {files: ["C/Program Files/Google/Search/immersivesearch.css"]},
				js: {files: ["C/Windows/System32/rundll32.js","C/Windows/System32/shellui.js"]},
				run_at: "document_end"
			}
		],520,190);
	});
}

initShell();