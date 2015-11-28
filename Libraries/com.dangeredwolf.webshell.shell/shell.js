updateBootStatus("Initialising shell.js...")

const debugWindowAnimations = false;
const debugAuthentication = false;
const bootLogo = $(".bootlogo");
const lockScreen = $(".lockscreen");
const tasks = $(".tasks");
const lockScreenTimeNode = $(".lockscreentime.time");
const passwordInputBox = $(".authentication>input");
const windowManagerContainer = $(".dwm");
const wallpaper = $(".wallpaper");
const watermark = $(".watermark");
const authenticationTitle = $(".authentication>div");
const moduleDrawerBody = $(".startmenubody");

var mightNeedToSetup;
var options;
var loginHash;
var loginSalt;
var isModuleDrawerOpen = false;
var loginDataReady = false;
var pageLoadedQuickSoProcessDataImmediately = false;
var settingUp = false;
var worryAboutPerformance = 0;
var performanceFalseAlarms = 0;
var isSettingUp = false;
var setupTitle;
var langSelection;

os.storage.login = new IDBStore({
	dbVersion: '1',
	storeName: 'login',
	keyPath: 'id',
	autoIncrement: true,
	onStoreReady: function () {
		os.log("login store ready!");
		loginDataReady = true;
		if (pageLoadedQuickSoProcessDataImmediately) {
			processLoginData();
		}
	}
});

function processLoginData() {

	updateBootStatus("Processing login data...")

	os.storage.login.get("passwordSalt",function(e){
		loginSalt = e ? e.value : undefined;

		if (typeof loginSalt === "undefined") {
			initSetup();
		}

		if (typeof loginSalt !== "undefined" && typeof loginHash !== "undefined") {
			initShell();
		}
	});

	os.storage.login.get("passwordHash",function(e){
		loginHash = e ? e.value : undefined;

		if (typeof loginHash === "undefined") {
			initSetup();
		}

		if (typeof loginHash !== "undefined" && typeof loginSalt !== "undefined") {
			initShell();
		}
	});
}

function initShell() {

	updateBootStatus("Initialising Shell...");

	if (!settingUp) {
		bootLogo.delay(1500).addClass("fadeout");
		lockScreen.delay(2300).removeClass("hidden");
		os.delay(bootLogo.remove,2000);
		updateLockScreenTime();
		initialiseShellAwareness();
		initLockScreen();
	}

}

function updateLockScreenTime() {

	if ($(".lockscreenopened").length > 0) {
		os.log("well bye");
		return;
	}

	var thedate = new Date();
	var parsetime = thedate.toTimeString().split(":");
	var parsedate = thedate.toDateString().split(" ");
	var month = os.formatMonth(parsedate[1]);

	lockScreenTimeNode.html(parsetime[0] + ":" + parsetime[1] + "<div class='lockscreendate'>" + parsedate[2] + " " + month + "</div>");

	setTimeout(updateLockScreenTime,2000);
}

function _lockDeviceScreen() {
	lockScreen.removeClass("lockscreenopened hidden")
	passwordInputBox.focus();
	
	os.body.delay(400).removeClass();
	$([wallpaper,windowManagerContainer]).delay(400).addClass("hidden");
	
	updateLockScreenTime();
}

os.lock = _lockDeviceScreen;

function testLogin() {
	if (!loginHash) {
		throw "The account storage container for this user has not been set up";
		authenticationTitle.html("Something happened");
	}

	if (os.hash(passwordInputBox.val() + loginSalt + "") + "" === loginHash + "") {
		lockScreen.addClass("lockscreenopened hidden");
		login();
	} else {
		authenticationTitle.html("Incorrect Password");

		setTimeout(function(){
			authenticationTitle.html("Hey, User!");
		},1500)
	}
}

function login() {
	initialiseShellUX();

	windowManagerContainer.removeClass("hidden");
	passwordInputBox.val("");

	wallpaper.removeClass("hidden").on("mousedown", function(){
		unfocusWindows();
	});
}

function unfocusWindows() {
	$(".window:not(.windowunfocussed)").addClass("windowunfocussed");
	closeModuleDrawer();
}

function closeModuleDrawer() {
	isModuleDrawerOpen = false;
	moduleDrawerBody.removeClass("startmenubodyopen");
}

function openModuleDrawer() {
	isModuleDrawerOpen = true;
	moduleDrawerBody.addClass("startmenubodyopen");
}

function toggleModuleDrawer() {
	isModuleDrawerOpen = !isModuleDrawerOpen;

	if (isModuleDrawerOpen) {
		openModuleDrawer();
	} else {
		closeModuleDrawer();
	}
}

function initialiseShellAwareness() {

	updateBootStatus("Initialising Shell Awareness and Adaptation Process...");

	FPSMeter.run(6);

	root.on("openwindow",function(args){
		openWindow(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10],args[11],args[12]);
	});

	root.on("shutdown",os.shutdown);

	root.on("lockscreen",function(args){
		lockDeviceScreen();
	});

	root.on("starttoggle",toggleModuleDrawer);
	watermark.html("WebShell Version " + os.version + "<br>Experimental Copy. Build " + os.build);
	passwordInputBox.focus();

	doc.on('fps',function(e){
		os.log("FPS " + e.fps + " (" + os.fpsStatusParseHelper(e.fps) + ")");
		
		if (e.fps < 30 && !html.hasClass("reduceRedundantEffects") && worryAboutPerformance < 4) {
			worryAboutPerformance++;
			os.log("Worrying about performance! If this keeps up we'll reduce some redundant effects.")
		} else if (e.fps < 30 && worryAboutPerformance >= 4) {
			os.log("FPS still below threshold at " + e.fps + ", enabling reduceRedundantEffects");
			html.addClass("reduceRedundantEffects");
			worryAboutPerformance = 0;
		} if (html.hasClass("reduceRedundantEffects") && e.fps > 55 && performanceFalseAlarms < 2) {
			os.log("Reduce redundant effects is on and performance is exceptionally good, let's try turning up effects!");
			performanceFalseAlarms++;
			html.removeClass("reduceRedundantEffects");
		}
	},false);

}

function initSetup() {

	isSettingUp = true;

	body.html("");

	head.append(make("link")
	.attr("rel","stylesheet")
	.attr("href","Themes/com.dangeredwolf.webshell.theme-default/css/setup.css"));

	langSelection = make("select")
	.attr("id","langselection")
	.append(
		make("option")
		.val("")
		.html("-------")
	)
	.append(
		make("option")
		.val("en")
		.html("English")
	)
	.append(
		make("option")
		.val("de")
		.html("Deutsche")
	)
	.append(
		make("option")
		.val("es")
		.html("Español")
	)
	.append(
		make("option")
		.val("fr")
		.html("Français")
	)
	.append(
		make("option")
		.val("nl")
		.html("Nederlands")
	)
	.change(function(){
		html.removeClass("fadeinanim").addClass("fadeoutanim");

		os.delay(function() {
			if ($("#regionopts").length > 0) {
				options = $("#regionopts").html("");
			} else {
				options = make("select")
				.attr("id","regionopts")
				.change(startKeyboardSelection);

				body.append(options);
			}

			html.removeClass("fadeoutanim").addClass("fadeinanim");

			switch ($("#langselection>:checked").val()) {
				case "en": 
					setupTitle.html("Language");

					var option0 = make("option")
					.val("")
					.html("-------");

					var option1 = make("option")
					.val("en_US")
					.html("English (United States)");

					var option2 = make("option")
					.val("en_GB")
					.html("English (United Kingdom)");

					var option3 = make("option")
					.val("en_GB")
					option3.html("English (Canada)");

					var option4 = make("option")
					.val("en_GB")
					option4.html("English (Australia)");

					var option5 = make("option")
					.val("en_GB")
					.html("English (India)");

					var option6 = make("option")
					.val("en_GB")
					option6.html("English (Ireland)");

					options.append(option0).append(option1).append(option2).append(option3).append(option4).append(option5).append(option6);

					break;
				case "es":
					setupTitle.html("Idioma");

					var option0 = make("option")
					.val("")
					.html("-------");

					var option1 = make("option")
					.val("es_419")
					.html("Español (America Latina)");

					var option2 = make("option")
					.val("es_419")
					.html("Español (México)");

					var option3 = make("option")
					.val("es")
					.html("Español (España)");

					var option4 = make("option")
					.val("es_419")
					.html("Español (Estados Unidos)");

					options.append(option0).append(option1).append(option2).append(option3).append(option4);

					break;
				case "fr":
					setupTitle.html("Langue");

					var option0 = make("option")
					.val("")
					.html("-------");

					var option1 = make("option")
					.val("fr")
					.html("Français (France)");

					var option2 = make("option")
					.val("fr")
					.html("Français (Canada)");

					options.append(option0).append(option1).append(option2);

					break;
				case "de":
					setupTitle.html("Sprache");

					var option0 = make("option")
					.val("")
					.html("-------");

					var option1 = make("option")
					.val("de")
					.html("Deutsche (Deutschland)");

					var option2 = make("option")
					.val("de")
					.html("Deutsche (Österreich)");

					var option3 = make("option")
					.val("de")
					.html("Deutsche (Schweiz)");

					options.append(option0).append(option1).append(option2).append(option3);

					break;
				case "nl":
					setupTitle.html("Naal");

					var option0 = make("option")
					.val("")
					.html("-------");

					var option1 = make("option")
					.val("nl")
					.html("Nederlands (Nederland)");

					var option2 = make("option")
					.val("nl")
					.html("Nederlands (Suriname, Caribbean)");

					options.append(option0).append(option1).append(option2);

					break;
				default:
					setupTitle.html("Language / Langue / Idioma / Sprache / Taal");
					options.remove();
					break;
			}

		},350)
	});

	setupTitle = make("div")
	.addClass("setuptitle")
	.html("Language / Langue / Idioma / Sprache / Taal");

	body.append(setupTitle).append(langSelection);

	settingUp = true;

	html.addClass("fadeinanim").attr("id","setupview");
}

function startKeyboardSelection() {
	html.removeClass("fadeinanim").addClass("fadeoutanim");
	os.delay(startUserSetup,350);
}

function startUserSetup() {
	body.html("");

	setupTitle = make("div")
	.html("Let's set up your account")
	.attr("class","setuptitle");	

	setting1 = make("input")
	.attr("placeholder","Password")
	.attr("id","setting1")
	.keypress(function(e){
		if (e.charCode === os.enterKeyCode) {
			setting2.focus();
		} 
	});

	setting2 = make("input")
	.attr("placeholder","Confirm Password")
	.keypress(function(e){
		if (e.charCode === os.enterKeyCode) {
			if (setting1.val() === setting2.val()) {
				setupTitle.html("Saving data...");
				saveCredentials(setting1.val());
			} else {
				setupTitle.html("Those passwords didn't match. Try again?");
			}
		} 
	});
	
	body.append(setupTitle).append(setting1).append(setting2);

	html.attr("class","fadeinanim");
}

function saveCredentials(setupPass) {
	var salt = os.randomChars(100);
	var hash = os.hash(setupPass + salt) + "";

	os.storage.login.put({"id":"passwordSalt","value":salt});
	os.storage.login.put({"id":"passwordHash","value":hash});
	os.setupPass = undefined;
	os.confirmPass = undefined;

	setupTitle.html("WebShell will restart in a moment to finish setup!");

	os.delay(function(){chrome.runtime.reload()},3000);

	return;
}

function initLockScreen() {

	passwordInputBox.keypress(function(e){
		if (e.charCode === os.enterKeyCode) {
			testLogin();
		}
	});
}

function openWindow(url,windowTitle,windowSizeX,windowSizeY,windowPositionX,windowPositionY,windowIcon,windowContent,windowDragOffsetLeft,windowDragOffsetRight) {

	if (os.isCurrentlyShuttingDown) {
		throw "Failed to open window because we're shutting down";
		return;
	}

	os.log(windowContent);

	var url = url || "https://www.google.com//%//%";
	var windowSizeX = windowSizeX || 800;
	var windowSizeY = windowSizeY || 500;

	var wid = windowSizeX;
	var hei = windowSizeY;
	var vw = $(window).width();
	var vh = $(window).height();
	var windowID = Math.floor(Math.random() * 999999999999999);

	unfocusWindows();

	var draghandle = os.make("div")
	.addClass("windowdraghandle");
	
	var minimise = os.make("button")
	.addClass("windowcontrol min")
	.html("&#xE15B");

	var maximise = os.make("button")
	.addClass("windowcontrol max")
	.html("&#xE3C6");

	var close = os.make("button")
	.addClass("windowcontrol close")
	.html("&#xE5CD");

	var draghandle = os.make("div")
	.addClass("windowdraghandle");

	var closefunc = function() {
		webviewnojq.executeScript({code:"window.close();"},function(e){os.log(e)});
		webview.parent().addClass("windowclosed");
		taskicon.addClass("taskclosing");

		if (!debugWindowAnimations) {
			setTimeout(function(){
				div.remove();
				taskicon.remove();
			},2000);
		}
	}

	close.click(closefunc);

	maximise.click(function(data,handler){
		div.toggleClass("fillscreen")
	});

	var webview = os.make("webview")
	.addClass("windowbody")
	.attr("partition","persist:system")
	.css("height",windowSizeY + "px")
	.css("width",windowSizeX + "px");

	webviewnojq = webview[0];

	var windowcontrols = os.make("div")
	.addClass("windowcontrols")
	.append(minimise)
	.append(maximise)
	.append(close);
	
	var div = os.make("div")
	.addClass("window draggable resizable hidden")
	.attr("id",windowID)
	.css("left",(windowPositionX||vw/2-wid/2)+"px")
	.css("top",(windowPositionY||vh/2-hei/2)+"px")
	.css("height",windowSizeY + "px").css("width",windowSizeX + "px")
	.append(draghandle)
	.append(windowcontrols)
	.append(webview)
	.draggable({delay:200,distance:3,handle:".windowdraghandle"})
	.resizable()
	.on("resize",function(e,u){
		if (div.hasClass("fillscreen")) {
			preventDefault();
			return;
		}
		
		if (u.originalSize.width !== u.size.width && u.originalSize.height !== u.size.height) {
			webview.width(div.width());
			webview.height(div.height());
		} else if (u.originalSize.width !== u.size.width) {
			webview.width(div.width());
			div.height(webview.height());
		} else if (u.originalSize.height !== u.size.height) {
			webview.height(div.height());
			div.width(webview.width());
		}
	});

	var taskicon;

	if (!!windowIcon) {

		if ($(".task[icon='" + windowIcon + "']").length >= 0) {
			taskicon = $(".task[icon='" + windowIcon + "']");
		} else {
			taskicon = os.make("div")
			.addClass("task")
			.attr("icon",windowIcon)
			.html(windowIcon);
		}

		taskicon.addClass("taskopen")
		.attr("id",windowID)
		.mousedown(function(event) {
			switch (event.which) {
				case 1:
					unfocusWindows();
					div.removeClass("windowunfocussed");
					os.log("hey");
				case 2:
					os.log('Middle mouse button pressed');
					break;
				case 3:
					os.log('Right mouse button pressed');
					break;
				default:
					os.log('You have a strange mouse');
			}
		});

		$(".tasks").append(taskicon);
	}

	if (!!windowDragOffsetLeft || !!windowDragOffsetRight) {
		draghandle.attr("style","left:" + (windowDragOffsetLeft ? windowDragOffsetLeft : 0) + "px;right:" + (windowDragOffsetRight ? windowDragOffsetRight : 150) + "px")
	}

	os.log(windowDragOffsetLeft)

	if (!!windowContent) {
		webviewnojq.addContentScripts(windowContent);
	}

	div.mousedown(function(){
		unfocusWindows();
		div.removeClass("windowunfocussed");
	});

	$(".dwm").append(div);

	webviewnojq.setUserAgentOverride(navigator.userAgent.replace(/Chrome\/\d+/g,"Chrome/99") + " WebShell/" + os.version + "." + os.build);

	webview.on("contentload",function() {
		
		div.delay(400).removeClass("hidden")

		if (!!windowContent) {
			webviewnojq.addContentScripts(windowContent);
		}
	});

	webview.on("newwindow", function(e) {
		openWindow(e.targetUrl,e.name,e.initialWidth,e.initialHeight);
	});

	webview.on("close",closefunc);

	webview.on("unresponsive", function(e) {
		webview.addClass("unresponsive");
	});

	webview.on("responsive", function(e) {
		webview.removeClass("unresponsive");
	});

	webview.attr("src",url);
}

function initialiseShellUX() {

	updateBootStatus("Initialising Shell UX...");

	$(".startbutton").click(toggleModuleDrawer);
	$("#shutdownbutton").click(os.shutdown);
	$("#lockbutton").click(os.lock);

	$("#youtubebutton").click(function(){
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

	$("#settingsbutton").click(function(){
		openWindow("CoreApps/org.webshell.settings/settings.html","Settings",1200,700,undefined,undefined,"&#xe8b8",undefined,250);
	});

	$("#gimmbutton").click(function(){
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
	if (loginDataReady) {
		updateBootStatus("Waiting for login data to be processed...")
		processLoginData();
	} else {
		pageLoadedQuickSoProcessDataImmediately = true;
		updateBootStatus("Waiting for login data...")
	}
});

updateBootStatus("Waiting for page load...")