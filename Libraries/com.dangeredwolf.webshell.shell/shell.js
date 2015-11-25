const debugWindowAnimations = false;
const debugAuthentication = false;
var scrollTimer = 0;
var startmenuopen = false;
var pwHash;
var pwSalt;
var storeReady = false;
var pleaseLoadDataImmedientlyThankYou = false;
var settingUp = false;
window.tickedNewbie = false;
var body = $(document.body);

function make(thing) {
	return $(document.createElement(thing));
}

os.storage.login = new IDBStore({
	dbVersion: '1',
	storeName: 'login',
	keyPath: 'id',
	autoIncrement: true,
	onStoreReady: function () {
		console.log("login store ready!");
		storeReady = true;
		if (pleaseLoadDataImmedientlyThankYou)
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
			initShell();
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
			initShell();
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

	$(".bootlogo").delay(1500).addClass("fadeout");
	$(".bootlogo").delay(2000).remove();

	if (!settingUp) {
		$(".lockscreen").delay(2300).removeClass("hidden");
	}

	lockscreenTimeUpdate();
	initShellEvents();
}

function lockscreenTimeUpdate() {

	if ($(".lockscreenopened").length) {
		console.log("well bye");
		return;
	}

	var thedate = new Date();
	var parsetime = thedate.toTimeString().split(":");
	var parsedate = thedate.toDateString().split(" ");
	var month = FormatMonth(parsedate[1]);
	var timenode = $(".lockscreentime.time");

	timenode.html(parsetime[0] + ":" + parsetime[1] + "<div class='lockscreendate'>" + parsedate[2] + " " + month + "</div>");

	setTimeout(lockscreenTimeUpdate,2000);
}

function lockDeviceScreen() {
	$(".lockscreen").removeClass("lockscreenopened")
	$(".authentication input").focus();
	
	body.delay(400).removeClass();
	$("html>body>.wallpaper:not(.lockscreen)").delay(400).addClass("hidden");
	
	lockscreenTimeUpdate();
}

function parseBool(a) {
	return a === "true";
}

function testLogin() {
	if (!pwHash) {
		throw "The account storage container for this user has not been set up";
		$(".authentication div").html("Something happened");
	}

	if (CryptoJS.SHA3($(".authentication input").val() + pwSalt + "") + "" === pwHash + "") {
		$(".lockscreen").attr("class","lockscreen lockscreenopened wallpaper hidden");
		login();
	} else {
		$(".authentication div").html("Incorrect Password");

		setTimeout(function(){
			$(".authentication div").html("Hey, User!");
		},1500)
	}
}

function login() {
	startShellExperienceHost();

	$(".dwm").removeClass("hidden");
	$(".wallpaper.hidden:not(.lockscreen)").removeClass("hidden");
	$(".authentication input").val("");
	$("html>.wallpaper").on("mousedown", function(){
		closestart();
		unfocusWindows();
	});
}

function unfocusWindows() {
	$(".window:not(.windowunfocussed)").addClass("windowunfocussed");
}

function closestart() {
	startmenuopen = false;
	$(".startmenubody").removeClass("startmenubodyopen");
}

function openstart() {
	startmenuopen = true;
	$(".startmenubody").addClass("startmenubodyopen");
}

function initShellEvents() {

	window.addEventListener("openwindow",function(args){
		console.log(args);
		openWindow(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10],args[11],args[12]);
	});

	window.addEventListener("shutdown",function(args){
		os.shutdown();
	});

	window.addEventListener("setupsavecredentials",function(args){
		console.log("DING! " + args[0]);

		os.setupPass = args[0];
		os.confirmPass = args[0];

		saveCredentials();
	});

	window.addEventListener("lockscreen",function(args){
		lockDeviceScreen();
	});

	window.addEventListener("starttoggle",function(){
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

	$(".watermark").html("WebShell Version " + os.systemVersion + "<br>Experimental Copy. Build " + os.systemBuild);

	$(".authentication input").focus();
}

function generateRandomCharacter() {
	var chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","^","&","*","(",")","_","-","=","+","[","]","{","}","\\","|","'","\"",";",":","<",">",".",",","/","?","~","`"];
	var randomNumber = Math.floor(Math.random() * chars.length);
	return chars[randomNumber];
}

function generateRandomCharacters(num) {
	var randomChars = "";
	for (var i = 0; i < num; i++) {
		randomChars += generateRandomCharacter();
	}

	return randomChars;
}

function setupLogin() {
	var webview = make("webview").attr("partition","persist:system").attr("style","height:100%;width:100%").addClass("windowbody").attr("src","CoreApps/com.dangeredwolf.webshell.setup/setup.html");
	var div = make("div").css("left",0).css("top",0).css("width","100%").css("height","100%").css("opacity","0.001").addClass("window").append(webview);
	body.append(div);
	webview[0].addEventListener("contentload",function(){
		$(".bootlogo").addClass("fadeout");
		div.delay(500).css("opacity",1)
	})

	webview[0].addEventListener("dialog",function(e){
		if (e.messageText === "ihaspassword") {
			webview[0].executeScript({code:"document.querySelector('#setting1').value;"},function(result){
				window.setupPass = result[0];
				window.confirmPass = result[0];
				saveCredentials(result[0]);
				webview[0].executeScript({code:"var div=document.createElement('div');div.id='shallwecontinue';document.body.appendChild(div);//setTimeout(function(){document.querySelector('#setting1').value=Math.random();},500);"});
				div.css("opacity",1)
				$(".bootlogo").removeClass("fadeout");

				setTimeout(function(){
					chrome.runtime.reload();
				},1200)
			});
		};
		return;
	})

	$(".lockscreen").addClass("hidden");

	settingUp = true;
}

function saveCredentials(setupPass) {
	var salt = generateRandomCharacters(100);
	var hash = CryptoJS.SHA3(setupPass + salt) + "";

	console.log("hash: " + hash + ", salt: " + salt)

	if (debugAuthentication) {
		$(".authentication div").html("DEBUG!!!!!!! hash: " + hash + ", salt: " + salt);
	}

	os.storage.login.put({"id":"passwordSalt","value":salt});
	os.storage.login.put({"id":"passwordHash","value":hash});
	os.setupPass = undefined;
	os.confirmPass = undefined;

	os.savedCredentialsJustNow = true;

	initLockscreen();

	return;
}

function initLockscreen() {

	if (settingUp) {
		$(".lockscreen").addClass("hidden");
		return;
	}

	$(".authentication input").keypress(function(e){
		if (e.charCode === 13) {
			testLogin();
		}
	});
}

function openWindow(url,title,sizex,sizey,posx,posy,icon,extracontent,dragleft,dragright) {

	if (shuttingdown) {
		throw "Failed to open window because we're shutting down";
		return;
	}

	console.log(extracontent);

	var url = !url ? "https://www.google.com//%//%" : url;

	var windowwidth = sizex || 800;
	var windowheight = sizey || 500;
	var wid = windowwidth;
	var hei = windowheight;
	var vw = $(window).width();
	var vh = $(window).height();
	var windowid = Math.floor(Math.random() * 999999999999999);

	unfocusWindows();

	var draghandle = make("div").addClass("windowdraghandle").draggable({});
	var minimise = make("button").addClass("windowcontrol min").html("&#xE15B");
	var maximise = make("button").addClass("windowcontrol max").html("&#xE3C6");
	var close = make("button").addClass("windowcontrol close").html("&#xE5CD");
	var draghandle = make("div").addClass("windowdraghandle");

	close.click(function(data,handler){
		webview[0].executeScript({code:"window.close();"},function(e){console.log(e)});
	});

	maximise.click(function(data,handler){
		div.toggleClass("fillscreen")
	});

	var webview = make("webview").addClass("windowbody").attr("partition","persist:system").css("height",windowheight + "px").css("width",windowwidth + "px");
	var windowcontrols = make("div").addClass("windowcontrols").append(minimise).append(maximise).append(close);
	var div = make("div").addClass("window draggable resizable windownative hidden").attr("id",windowid).css("left",(posx||vw/2-wid/2)+"px").css("top",(posy||vh/2-hei/2)+"px").css("height",windowheight + "px").css("width",windowwidth + "px").append(draghandle).append(windowcontrols).append(webview).draggable({delay:200,distance:3,handle:".windowdraghandle"});

	var taskicon;

	if (!!icon) {

		if (typeof $(".task[icon='" + icon + "']")[0] !== "undefined") {
			taskicon = $(".task[icon='" + icon + "']");
		} else {
			taskicon = make("div").addClass("task").attr("icon",icon);
		}

		taskicon.html(icon);

		taskicon.addClass("taskopen").attr("id",windowid).click(function(){
			unfocusWindows();
			div.removeClass("windowunfocussed");
			console.log("hey");
		});

		$(".tasks").append(taskicon);
	}

	if (!!dragleft || !!dragright) {
		draghandle.attr("style","left:" + (dragleft ? dragleft : 0) + "px;right:" + (dragright ? dragright : 150) + "px")
	}

	console.log(dragleft)

	if (!!extracontent) {
		webview[0].addContentScripts(extracontent);
	}

	div.mousedown(function(){
		unfocusWindows();
		div.removeClass("windowunfocussed");
	});

	$(".dwm").append(div);

	webview[0].setUserAgentOverride(navigator.userAgent.replace(/Chrome\/\d+/g,"Chrome/99") + " WebShell/" + systemVersion + "." + systemBuild);

	webview.on("contentload",function() {
		
		div.delay(400).removeClass("hidden")

		if (!!extracontent) {
			webview[0].addContentScripts(extracontent);
		}
	});

	webview.on("newwindow", function(e) {
		openWindow(e.targetUrl,e.name,e.initialWidth,e.initialHeight);
	});

	webview.on("close", function(e) {
		webview.parent().addClass("windowclosed");
		if (!debugWindowAnimations) {
			//div.delay(1000).remove(); //TODO: Report delay remove() bug to jQuery
			setTimeout(function(){
				div.remove();
			},2000);
		}
	});

	webview.on("unresponsive", function(e) {
		webview.addClass("unresponsive");
	});

	webview.on("responsive", function(e) {
		webview.removeClass("unresponsive");
	});

	$(".window#" + windowid).resizable().on("resize",function(e,ui){
		if (div.hasClass("fillscreen")) {
			preventDefault();
			return;
		}
		
		if (ui.originalSize.width !== ui.size.width && ui.originalSize.height !== ui.size.height) {
			webview.width(div.width());
			webview.height(div.height());
		} else if (ui.originalSize.width !== ui.size.width) {
			webview.width(div.width());
			div.height(webview.height());
		} else if (ui.originalSize.height !== ui.size.height) {
			webview.height(div.height());
			div.width(webview.width());
		}
	});

	webview[0].src = url;
}

function startShellExperienceHost() {

	$(".startbutton").click(function(){
		$(".startmenubody").toggleClass("startmenubodyopen");
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

	$("#youtubebutton").click(function(){
		$(".startmenubody")[0].className = "startmenubody";
		openWindow("https://youtube.com","",undefined,undefined,undefined,undefined,"&#xe037",[
			{
				name:"youtubeRule",
				matches: ["https://*.youtube.com/*","http://*.youtube.com/*"],
				css: {files: ["Apps/com.google-unofficial.youtube/immersiveyoutube.css"]},
				js: {files: ["Libraries/org.jquery/jquery.min.js","Libraries/org.jquery.ui/jqueryui.min.js"]},
				run_at: "document_end"
			}
		],1280,720);
	});

	$("#aboutbutton").click(function(){
		$(".startmenubody").removeClass("startmenubodyopen");
		openWindow("Apps/com.dangeredwolf.wsapp.wsversion/version.html","About",600,380,undefined,undefined,"&#xe88e");
	});

	$("#settingsbutton,.task[icon='']").click(function(){
		$(".startmenubody").removeClass("startmenubodyopen");
		openWindow("CoreApps/org.webshell.settings/settings.html","Settings",1200,700,undefined,undefined,"&#xe8b8",undefined,250);
	});

	$("#immtestbutton").click(function(){
		$(".startmenubody").removeClass("startmenubodyopen");
		openWindow("C/Windows/System32/immersive.html","Immersive Test",undefined,undefined,undefined,undefined,"&#xe5d0");
	});

	$("#gimmbutton").click(function(){
		$(".startmenubody").removeClass("startmenubodyopen");
		openWindow("https://google.com","",undefined,undefined,undefined,undefined,"&#xe8b6",[
			{
				name:"googleRule",
				matches: ["https://*.google.com/*","http://*.google.com/*"],
				css: {files: ["Apps/com.google-unofficial.search/immersivesearch.css"]},
				js: {files: ["Libraries/org.jquery/jquery.min.js","Libraries/org.jquery.ui/jqueryui.min.js"]},
				run_at: "document_end"
			}
		],520,190);
	});
}

$(window).load(function(){
	if (storeReady) {
		loadLoginData();
	} else {
		pleaseLoadDataImmedientlyThankYou = true;
	}
});