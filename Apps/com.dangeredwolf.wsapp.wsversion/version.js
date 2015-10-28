os = window.parent.window;

document.body.innerHTML = document.body.innerHTML.replace("INSERTVINFOHERE","Version " + os.systemVersion + " (build " + os.systemBuild + ")")