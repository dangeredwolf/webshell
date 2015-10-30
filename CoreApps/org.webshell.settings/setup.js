$(".back0").click(function(){
	$(".settingspanelview div,#sidepanel").removeClass();
	$("#sidepanel").addClass("panelroot");
});

$("#personalisationbutton").click(function(){
	$("#sidepanel").removeClass();
	$("#sidepanel").addClass("panelpersonalise");
});

$("#devicebutton").click(function(){
	$("#sidepanel").removeClass();
	$("#sidepanel").addClass("paneldevice");
});

$("#taskbarbutton").click(function(){
	$(".settingspanelview div").removeClass();
	$("#taskbarview").addClass("viewopen");
});

$("#wallpaperbutton").click(function(){
	$(".settingspanelview div").removeClass();
	$("#wallpaperview").addClass("viewopen");
});

$(document).ready(function() {
    $('select').material_select();
});