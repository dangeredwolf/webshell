// org.webshell.system.wsload
// (c) 2016, The WebShell Foundation
// Code released under the GPL (GNU Public License)

const useUniLibrary = true;

window.os = window;

os.version = "1.0";
os.build = "14200 (openshell.milestone.alpha2)";
os.documentLoaded = true;

os._bootStatusElement = document.querySelector(".bootstatus");
os.updateBootStatus = function(status) {
	os._bootStatusElement.innerHTML = status;
}

updateBootStatus("halt:org.webshell.system:psuedo.initModules");

function _onModuleLoaded(module) {
	updateBootStatus("loaded:" + module);
	console.log("Module " + module + " loaded")
}

function coreLoadModule(moduleName,onload) {
	require([moduleName],function(dependency){_onModuleLoaded(moduleName);if(onload){onload(dependency);}})
}

if (useUniLibrary) {
	coreLoadModule("Libraries/org.webshell.libraries/libraries.js",function(dependency){
		os._bootStatusElement = $(os._bootStatusElement);
		os.updateBootStatus = function(status) {
			os._bootStatusElement.html(status);
		}

		setTimeout(function(){
			coreLoadModule("Libraries/com.dangeredwolf.webshell.shell/shell.js");
		},200);
	});

} else {

	coreLoadModule("Libraries/org.jquery/jquery.min.js",function(dependency){
		os._bootStatusElement = $(os._bootStatusElement);
		os.updateBootStatus = function(status) {
			os._bootStatusElement.html(status);
		}
	});

	coreLoadModule("Libraries/io.kaizouman.fpsmeter/fpsmeter.min.js");

	coreLoadModule("Libraries/io.jeffmott.cryptojs/sha3.min.js",function(dependency){
		os.hash = dependency;
	});

	coreLoadModule("Libraries/org.hammerjs/hammer.min.js",function(dependency){
		os.Hammer = dependency;
	});

	coreLoadModule("Libraries/org.jensarps.idbstore/idbstore.js",function(dependency){
		os.IDBStore = dependency;
	});

	coreLoadModule("Libraries/org.materialize/materialize.min.js");
	coreLoadModule("Foundation/com.dangeredwolf.webshell.system/utils.js");
	coreLoadModule("Libraries/com.dangeredwolf.webshell.shell/shell.js");

}
