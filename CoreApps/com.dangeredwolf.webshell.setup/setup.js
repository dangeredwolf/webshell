var os = window.parent.window;
var options;

function startKeyboardSelection() {
	$("html")[0].className = "fadeoutanim";
	setTimeout(startUserSetup,350);
}

function startUserSetup() {
	document.body.innerHTML = "";

	var title = document.createElement("div");
	title.innerHTML = "Let's set up your account";
	title.className = "setupTitle";	
	document.body.appendChild(title);

	var setting1 = document.createElement("input");
	setting1.placeholder = "Password";
	setting1.id = "setting1";
	document.body.appendChild(setting1);

	var setting2 = document.createElement("input");
	setting2.placeholder = "Confirm Password";
	document.body.appendChild(setting2);

	$("html")[0].className = "fadeinanim";

	$(setting1).change(function(){
		if (typeof document.querySelector("#shallwecontinue") !== "undefined") {
			continueSetupAfterSaving();
		}
	})

	$(setting1).keypress(function(e){
		if (e.charCode === 13) {
			setting2.focus();
		} 
	});

	$(setting2).keypress(function(e){
		if (e.charCode === 13) {
			if (setting2.value === setting1.value) {
				title.innerHTML = "This will just be a moment..."
				alert("ihaspassword");
			} else {
				title.innerHTML = "Those passwords didn't match. Try again?";
			}
			
		} 
	});
}

function continueSetupAfterSaving() {
	$(".setupTitle")[0].innerHTML = "Save complete! [Do stuff here]"
}

$("#langselection").change(function(){

	$("html")[0].className = "fadeoutanim";

	setTimeout(function() {
		try {
			$("#regionopts")[0].innerHTML = "";
			options = $("#regionopts")[0];
		} catch(e) {
			options = document.createElement("select");
			options.id = "regionopts";
			$(options).change(startKeyboardSelection);
			document.body.appendChild(options);
		}

		$("html")[0].className = "fadeinanim";

		switch($("#langselection").val()) {
			case "en": 
				$(".setuptitle")[0].innerHTML = "Language";

				var option1 = document.createElement("option");
				option1.value = "en_US";
				option1.innerHTML = "English (United States)";
				options.appendChild(option1);

				var option5 = document.createElement("option");
				option5.value = "en_GB";
				option5.innerHTML = "English (United Kingdom)";
				options.appendChild(option5);

				var option5 = document.createElement("option");
				option5.value = "en_GB";
				option5.innerHTML = "English (Canada)";
				options.appendChild(option5);

				var option5 = document.createElement("option");
				option5.value = "en_GB";
				option5.innerHTML = "English (Australia)";
				options.appendChild(option5);

				var option5 = document.createElement("option");
				option5.value = "en_GB";
				option5.innerHTML = "English (India)";
				options.appendChild(option5);

				var option5 = document.createElement("option");
				option5.value = "en_GB";
				option5.innerHTML = "English (Ireland)";
				options.appendChild(option5);

				break;
			case "es":
				$(".setuptitle")[0].innerHTML = "Idioma";

				var option1 = document.createElement("option");
				option1.value = "es_419";
				option1.innerHTML = "Español (America Latina)";
				options.appendChild(option1);

				var option1 = document.createElement("option");
				option1.value = "es_419";
				option1.innerHTML = "Español (México)";
				options.appendChild(option1);

				var option5 = document.createElement("option");
				option5.value = "es";
				option5.innerHTML = "Español (España)"
				options.appendChild(option5);

				var option1 = document.createElement("option");
				option1.value = "es_419";
				option1.innerHTML = "Español (EE.UU.)";
				options.appendChild(option1);
				break;
			case "fr":
				$(".setuptitle")[0].innerHTML = "Langue";

				var option1 = document.createElement("option");
				option1.value = "fr";
				option1.innerHTML = "Français (France)";
				options.appendChild(option1);

				var option5 = document.createElement("option");
				option5.value = "fr";
				option5.innerHTML = "Français (Canada)"
				options.appendChild(option5);
				break;
			case "de":
				$(".setuptitle")[0].innerHTML = "Sprache";

				var option5 = document.createElement("option");
				option5.value = "de";
				option5.innerHTML = "Deutsche (Deutschland)"
				options.appendChild(option5);

				var option5 = document.createElement("option");
				option5.value = "de";
				option5.innerHTML = "Deutsche (Österreich)"
				options.appendChild(option5);

				var option5 = document.createElement("option");
				option5.value = "de";
				option5.innerHTML = "Deutsche (Schweiz)"
				options.appendChild(option5);
				break;
			case "nl":
				$(".setuptitle")[0].innerHTML = "Naal";

				var option5 = document.createElement("option");
				option5.value = "nl";
				option5.innerHTML = "Nederlands (Nederland)"
				options.appendChild(option5);

				var option5 = document.createElement("option");
				option5.value = "nl";
				option5.innerHTML = "Nederlands (Suriname, Caribbean)"
				options.appendChild(option5);

				break;
			default:
				$(".setuptitle")[0].innerHTML = "Language / Langue / Idioma / Sprache / Taal";
				options.remove();
				break;
		}

	},350);
})

$("option[value='es']")[0].innerHTML = "Español";
$("option[value='fr']")[0].innerHTML = "Français";