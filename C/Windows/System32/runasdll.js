var os = window.parent.window;

$("#inputgo").click(function(){
	os.openWindow($("#inputpath")[0].value,$("#inputtitle")[0].value !== "" && $("#inputtitle")[0].value || undefined);
});