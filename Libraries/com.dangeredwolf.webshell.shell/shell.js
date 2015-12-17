// org.webshell.shell
// (c) 2016, The WebShell Foundation
// Code released under the GPL (GNU Public License)

const debugWindowAnimations = false; // Prevents removal of window and task elements upon closing of window
const bootLogo = $(".bootlogo"); // Constant of .bootlogo element, the loading screen container
const lockScreen = $(".lockscreen"); // Constant of .lockscreen element, the container of lockscreen elements
const tasks = $(".tasks"); // Constant of .tasks element, container of taskbar buttons for each window
const lockScreenTimeNode = $(".lockscreentime.time"); // Constant of .time element inside .lockscreentime element
const passwordInputBox = $(".authentication>input"); // Constant of password box inside .authentication element
const windowManagerContainer = $(".dwm"); // Constant of .dwm element, container of generated windows
const wallpaper = $(".wallpaper"); // Constant of .wallpaper element, element which helps render desktop background
const watermark = $(".watermark"); // Constant of system version watermark element, .watermark
const authenticationTitle = $(".authentication>div"); // Constant of authentication title, default text: "Hey, User!"
const moduleDrawer = $(".modulecontainer"); // Constant of module drawer body, containing modules like All Apps

var loginHash; // Upon reading hash, it's put here
var loginSalt; // Upon reading salt, it's put here
var isModuleDrawerOpen = false; // Ticked if module drawer is open or not
var loginDataReady = false; // Ticked if os.storage.login has initialised and if the containing data has been retrieved
var pageLoadedQuickSoProcessDataImmediately = false; // Ticked if document.ready is triggered before os.storage.login finishes initialising
var worryAboutPerformance = 0; // Counter used by performance manager to check if performance is too slow for too long, then switching to high-performance mode
var performanceFalseAlarms = 0; // Counter by performance manager to check if it's switching between high-performance and high-quality modes too frequently

var settingUp = false; // Returns true if in setup mode, false otherwise
var setupTitle; // Constant element defined during setup process
var langSelection; // Constant element defined during setup process, holds options for language
var options; // Constant element defined during setup process, holds different setup options

var hasShellBeenInitialised = false; // Variable if shell has been initialised or not

os.storage.login = new IDBStore({ // Initialise os.storage.login data; asynchronous
	dbVersion: '1',
	storeName: 'login',
	keyPath: 'id',
	autoIncrement: true,
	onStoreReady: function () { // Code triggered after os.storage.login initialises
		console.log("login store ready!");
		loginDataReady = true;
		if (pageLoadedQuickSoProcessDataImmediately) {
			processLoginData();
		}
	}
});

/*
onPageLoad()

This function is called when the webpage has completed loading
*/

function onPageLoad() {
	if (loginDataReady) {
		updateBootStatus("halt:org.webshell.shell:processLoginData:ready");
		processLoginData();
	} else {
		updateBootStatus("halt:org.webshell.shell:processLoginData:notready");
		pageLoadedQuickSoProcessDataImmediately = true;
	}
}

/*
revokeCredentials()

This function is called if function processLoginData detects that there is a problem with the login data it retrieved (i.e. invalid hash/salt)
*/
function revokeCredentials() {
	os.storage.login.clear(); // Clean bad storage
	os.delay(function(){chrome.runtime.reload()},300); // Reload client, triggering setup
}

/*
processLoginData()

This function is called once os.storage.login has finished initialising and the document is ready
*/
function processLoginData() {

	updateBootStatus("org.webshell.shell:processLoginData");

	os.storage.login.get("passwordSalt",function(e){
		loginSalt = e ? e.value : undefined; // Set global variable

		console.log("got salt!");
		console.log(loginHash + "hash by salt");
		console.log(loginSalt + "salt by salt");
		console.log("ready by salt? " + (typeof loginHash !== "undefined" && typeof loginSalt !== "undefined"));

		if (typeof loginSalt === "undefined") { // Can't find salt? Go to setup ASAP
			initSetup();
		} else if (loginSalt.length === 100) { // Legacy (pre-build 13200) login, needs to be reset
			console.error("Invalid credentials");
			revokeCredentials();
			return;
		}

		if (typeof loginSalt !== "undefined" && typeof loginHash !== "undefined") { // Salt and hash loaded? Let's get everything else ready
			initShell();
		}
	});

	os.storage.login.get("passwordHash",function(e){
		loginHash = e ? e.value : undefined; // Set global variable

		console.log("got hash!");
		console.log(loginHash + "hash by hash");
		console.log(loginSalt + "salt by hash");
		console.log("ready by hash? " + (typeof loginHash !== "undefined" && typeof loginSalt !== "undefined"));

		if (typeof loginHash === "undefined") { // Can't find hash? Go to setup ASAP
			initSetup();
		} else if (os.hash("").toString().length !== loginHash.length) { // Hash tested to be invalid, needs to be reset
			console.error("Invalid credentials");
			revokeCredentials();
			return;
		}

		if (typeof loginHash !== "undefined" && typeof loginSalt !== "undefined") { // Hash and salt loaded? Let's get everything else ready
			initShell();
		}
	});
}

/*
initShell()

Initialises the general shell, when not in setup mode
*/
function initShell() {

	updateBootStatus("org.webshell.shell:initShell");

	if (!settingUp) { // As long as the shell isn't in setup mode, start regular processes
		bootLogo.delay(1500).addClass("fadeout"); // Fade out logo
		$(".wallpaper,.lockscreen,.modulecontainer,.dwm,.authentication,.opentasks").delay(2600).removeClass("hidden forcehidden");
		os.delay(bootLogo.remove,2000); // Remove bootlogo after 2 seconds
		updateLockScreenTime(); // Start updating lockscreen time
		initLockScreen(); // Initialise the lockscreen
		initialiseShellAwareness(); // Initialise shell awareness thread
	}

}

/*
updateLockScreenTime()

Thread that handles lockscreen time
*/
function updateLockScreenTime() {

	if ($(".lockscreenopened").length > 0) { // Lockscreen not open? No need to keep track of time here
		console.log("well bye");
		return;
	}

	var thedate = new Date(); // Get current date
	var parsetime = thedate.toTimeString().split(":"); // Parse time into array
	var parsedate = thedate.toDateString().split(" "); // Parse date into array
	var month = os.formatMonth(parsedate[1]); // Format the month (i.e. Jan -> January)

	lockScreenTimeNode.html(parsetime[0] + ":" + parsetime[1] + "<div class='lockscreendate'>" + parsedate[2] + " " + month + "</div>"); // Display time and date

	setTimeout(updateLockScreenTime,2000); // Update time again after 2 seconds
}

/*
_lockDeviceScreen()

Lock device screen, os.lock is an alias of this
*/
function _lockDeviceScreen() {

	closeModuleDrawer();

	lockScreen.removeClass("lockscreenopened hidden"); // Show the lockscreen
	passwordInputBox.focus(); // Focus on password box

	updateLockScreenTime(); // Start updating time again
}

os.lock = _lockDeviceScreen; // Set os.lock alias link to _lockDeviceScreen

/*
testLogin()

Test entered password against stored hash and salt
*/
function testLogin() {
	if (!loginHash || !loginSalt) { // This shouldn't be called without login hash and/or salt
		authenticationTitle.html("Something happened");
		throw "The account storage container for this user has not been set up";
	}

	if (os.hash(passwordInputBox.val() + loginSalt + "") + "" === loginHash + "") { // Compute hash from password + salt, compare to stored hash
		lockScreen.addClass("lockscreenopened hidden"); // Hide lockscreen
		initialiseShellUX(); // Initialise rest of the shell

		passwordInputBox.val(""); // Clear password box as a basic security precaution

		wallpaper.on("mousedown", function(){ // If you click wallpaper, every window will unfocus
			unfocusWindows();
		});
	} else {
		authenticationTitle.html("Incorrect Password"); // Incorrect password!!
		authenticationTitle.delay(1500).html("Hey, User!"); // Reset this
	}
}

/*
unfocusWindows()

Releases focus from all windows
*/
function unfocusWindows() {
	$(".window:not(.windowunfocussed)").addClass("windowunfocussed");
	closeModuleDrawer();
}

/*
closeModuleDrawer()

Closes the module drawer
*/
function closeModuleDrawer() {
	isModuleDrawerOpen = false;
	moduleDrawer.removeClass("modulecontaineropen");
}

/*
openModuleDrawer()

Opens the module drawer
*/
function openModuleDrawer() {
	isModuleDrawerOpen = true;
	moduleDrawer.addClass("modulecontaineropen");
}

/*
toggleModuleDrawer()

Toggles the module drawer
*/
function toggleModuleDrawer() {
	isModuleDrawerOpen = !isModuleDrawerOpen;
	moduleDrawer.toggleClass("modulecontaineropen");
}

/*
initialiseShellAwareness()

Initialises shell events and performance manager
*/
function initialiseShellAwareness() {

	updateBootStatus("org.webshell.shell:initialiseShellAwareness");

	watermark.html("WebShell Version " + os.version + "<br>Experimental Copy. Build " + os.build); // Initialise watermark

	FPSMeter.run(6); // Initialise fps metre, running every 6 seconds

	document.addEventListener('fps',function(e){ // Start performance manager
		console.log("FPS " + e.fps + " (" + os.fpsStatusParseHelper(e.fps) + ")");

		if (e.fps < 30 && !html.hasClass("reduceRedundantEffects") && worryAboutPerformance < 3) { // Too slow!!
			worryAboutPerformance++;
			console.log("Worrying about performance! If this keeps up we'll reduce some redundant effects.")
		} else if (e.fps < 30 && worryAboutPerformance >= 4) { // Still too slow!!!!!
			console.log("FPS still below threshold at " + e.fps + ", enabling reduceRedundantEffects");
			html.addClass("reduceRedundantEffects");
			worryAboutPerformance = 0;
		} if (html.hasClass("reduceRedundantEffects") && e.fps > 55 && performanceFalseAlarms < 2) { // Too fast!!!
			console.log("Reduce redundant effects is on and performance is exceptionally good, let's try turning up effects!");
			performanceFalseAlarms++;
			html.removeClass("reduceRedundantEffects");
		}
	},false);

}

/*
initSetup()

Initialises setup
*/
function initSetup() {

	settingUp = true; // Set settingUp flag

	body.html(""); // Clear the body

	head.append(make("link") // Add setup.css
	.attr("rel","stylesheet")
	.attr("href","Themes/org.webshell.theme-default/css/setup.css"));

	// The following messy-ish code is used to generate setup elements

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
	.change(function(){ // On selection
		html.removeClass("fadeinanim").addClass("fadeoutanim"); // Fade out

		os.delay(function() {
			if ($("#regionopts").length > 0) { // #regionopts exists?
				options = $("#regionopts").html("");
			} else { // Otherwise...
				options = make("select") // Make #regionopts
				.attr("id","regionopts")
				.change(startKeyboardSelection); // Link events

				body.append(options); // Add to body
			}

			html.removeClass("fadeoutanim").addClass("fadeinanim"); // Fadein

			switch ($("#langselection>:checked").val()) { // TODO: Use new generation format for these options
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

	setupTitle = make("div") // Regen setup title
	.addClass("setuptitle")
	.html("Language / Langue / Idioma / Sprache / Taal");

	body.append(setupTitle).append(langSelection);

	html.addClass("fadeinanim") // Add Fadein animation
	.attr("id","setupview"); // Tag as setup view
}

/*
startKeyboardSelection()

Placeholder function at the moment
*/
function startKeyboardSelection() {
	html.removeClass("fadeinanim").addClass("fadeoutanim");
	os.delay(startUserSetup,350);
}

/*
startUserSetup()

Setup login
*/
function startUserSetup() {
	body.html("")

	setupTitle = make("div")
	.html("Let's set up your account")
	.attr("class","setuptitle");

	body.append(setupTitle)
	.append(
		make("input")
		.attr("placeholder","Password")
		.attr("id","setting1")
		.keypress(function(e){
			if (e.charCode === os.enterKeyCode) {
				$("#setting2").focus()
			}
		})
	)
	.append(make("input")
		.attr("placeholder","Confirm Password")
		.attr("id","setting2")
		.keypress(function(e){
			if (e.charCode === os.enterKeyCode) {
				if ($("#setting1").val() === $("#setting2").val()) {
					setupTitle.html("Saving data...");
					saveCredentials($("#setting1").val());
				} else {
					setupTitle.html("Those passwords didn't match. Try again?");
				}
			}
		})
	);

	html.attr("class","fadeinanim");
}

/*
saveCredentials(string setupPass)

Takes given password, generates salt and hash
*/
function saveCredentials(setupPass) {
	var salt = os.randomChars(32);
	var hash = os.hash(setupPass + salt) + "";

	os.storage.login.put({"id":"passwordSalt","value":salt});
	os.storage.login.put({"id":"passwordHash","value":hash});
	os.setupPass = undefined;
	os.confirmPass = undefined;

	setupTitle.html("WebShell will restart in a moment to finish setup!");

	os.delay(function(){chrome.runtime.reload()},3000);

	return;
}

/*
initLockScreen()

Start lockscreen events
*/
function initLockScreen() {

	passwordInputBox.keypress(function(e){
		if (e.charCode === os.enterKeyCode) {
			testLogin();
		}
	});
}

/*
openWindow(string url, string title, int sizeX, int sizeY, int positionX, int positionY, string icon, object content, int dragOffsetL, int dragOffsetR)

Opens a new window
*/
function openWindow(url,windowTitle,windowSizeX,windowSizeY,windowPositionX,windowPositionY,windowIcon,windowContent,windowDragOffsetLeft,windowDragOffsetRight) {

	if (os.isCurrentlyShuttingDown) { // If shutting down... don't open new windows!
		throw "Failed to open window because we're shutting down";
		return;
	}

	var taskicon;
	var url = url || "https://www.google.com//%//%"; // Make sure there's actually a url
	var windowSizeX = windowSizeX || 800; // Default to x = 800
	var windowSizeY = windowSizeY || 500; // Default to y = 500

	var wid = windowSizeX; // Shortened versions
	var hei = windowSizeY;
	var vw = $(window).width(); // Window width
	var vh = $(window).height(); // Window height
	var windowID = Math.floor(Math.random() * 999999999999999); // Generate window ID

	unfocusWindows();

	var draghandle = make("div")
	.addClass("windowdraghandle");

	var minimise = make("button")
	.addClass("windowcontrol min")
	.html("&#xE15B")
	.click(function(data,handler){
		div.toggleClass("minimised");

		if (div.hasClass("fillscreen") && div.hasClass("minimised") && $(".window.fillscreen:not(.minimised)").length <= 0) {
			html.removeClass("appIsInFillscreen");
		} else if (div.hasClass("fillscreen") && !div.hasClass("minimised") && $(".window.fillscreen:not(.minimised)").length > 0) {
			html.addClass("appIsInFillscreen");
		}
	});

	var maximise = make("button")
	.addClass("windowcontrol max")
	.html("&#xE3C6")
	.click(function(data,handler){
		div.toggleClass("fillscreen");

		if ($(".window.fillscreen").length <= 0) { // Are ANY apps in fill screen left? If not, remove class, if so, keep or add
			html.removeClass("appIsInFillscreen");
		} else {
			html.addClass("appIsInFillscreen");
			$(".window").addClass("fillscreen")
		}
	});

	var closefunc = function() {
		webviewnojq.executeScript({code:"window.close();"},function(e){console.log(e)});
		div.addClass("windowclosed");

		if (div.hasClass("fillscreen") && $(".window.fillscreen").length <= 1) {
			html.removeClass("appIsInFillscreen");
		}

		try {
			taskicon.addClass("taskclosing");
		} catch (e){}

		if (!debugWindowAnimations) {
			setTimeout(function(){
				div.remove();
				taskicon.remove();
				if (html.hasClass("appIsInFillscreen") && $(".window.fillscreen").length <= 0) {
					html.removeClass("appIsInFillscreen");
				}
			},2000);
		}
	}

	var close = make("button")
	.addClass("windowcontrol close")
	.html("&#xE5CD")
	.click(closefunc);

	var draghandle = make("div")
	.addClass("windowdraghandle");

	var webview = make("webview")
	.addClass("windowbody")
	.attr("partition","persist:system")
	.css("height",windowSizeY + "px")
	.css("width",windowSizeX + "px")
	.on("contentload",function() {
		div.delay(400).removeClass("hidden")
		if (!!windowContent) {
			webviewnojq.addContentScripts(windowContent);
		}
		if (!!taskicon) {
			taskicon.addClass("taskopen")
		}
	})
	.on("newwindow", function(e) {
		openWindow(e.targetUrl,e.name,e.initialWidth,e.initialHeight);
	})
	.on("close",closefunc)
	.on("unresponsive", function(e) {
		webview.addClass("unresponsive");
	})
	.on("responsive", function(e) {
		webview.removeClass("unresponsive");
	})
	.attr("src",url);

	webviewnojq = webview[0];

	var windowcontrols = make("div")
	.addClass("windowcontrols")
	.append(minimise)
	.append(maximise)
	.append(close);

	var div = make("div")
	.addClass("window draggable resizable hidden")
	.attr("id",windowID)
	.css("left",windowPositionX||vw/2-wid/2)
	.css("top",windowPositionY||vh/2-hei/2)
	.css("height",windowSizeY)
	.css("width",windowSizeX)
	.append(draghandle)
	.append(windowcontrols)
	.append(webview)
	.draggable({delay:200,distance:3,handle:".windowdraghandle",drag:function(){
		if (div.hasClass("fillscreen")) {
			$(".window").removeClass("fillscreen");
			html.removeClass("appIsInFillscreen");
		}
	}})
	.resizable()
	.mousedown(function() {
		unfocusWindows();
		div.removeClass("windowunfocussed");
	})
	.on("resize",function(e,u) {
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

	if ($(".appIsInFillscreen").length > 0) {
		div.addClass("fillscreen");
	}

	if (windowIcon) {

		taskicon = make("div")
		.addClass("task")
		.attr("icon",windowIcon)
		.html(windowIcon)
		.attr("id",windowID)
		.mousedown(function(event) {
			if (event.which === 1 || event.which === 2) {
				unfocusWindows();
				div.removeClass("windowunfocussed minimised");
				console.log("Left (Or, perhaps, middle) clicked");
			} else if (event.which === 3) {
				console.log("Right clicked");
			} else {
				console.log("your mouse is weird");
			}
		});

		tasks.append(taskicon);
	}

	if (windowDragOffsetLeft || windowDragOffsetRight) {
		draghandle.css("left",windowDragOffsetLeft ? windowDragOffsetLeft : 0)
		.css("right",windowDragOffsetRight ? windowDragOffsetRight : 150)
	}

	if (windowContent) {
		webviewnojq.addContentScripts(windowContent);
	}

	$(".dwm").append(div);

	webviewnojq.setUserAgentOverride(navigator.userAgent.replace(/Chrome\/\d+/g,"Chrome/99") + " WebShell/" + os.version + "." + os.build);


}

/*
initialiseShellUX()

Initialises Shell UX, like moduledrawer
*/
function initialiseShellUX() {

	if (hasShellBeenInitialised) { // Shell already initialised, bye
		return;
	}

	hasShellBeenInitialised = true;

	updateBootStatus("org.webshell.shell:initialiseShellUX");

	$(".drawertoggle").click(toggleModuleDrawer);
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
		],100,190);
	});
}

updateBootStatus("halt:org.webshell.shell:onPageLoad");
onPageLoad();
