WebShell
--------

WebShell is a project designed to advanced the open web forward by building an open platform for anyone to contribute to, or run apps on. WebShell has a flexible license which allows it to be adapted to a wide number of uses. WebShell is currently in early Alpha stages, with a good bit of work finished on the UI, but there aren't any finished apps. It's still in active, constant development, so things might change in the future.

Why build a window manager on modern web technologies?
--------
The "old web" as we know it is vanishing into history. WebKit and Chromium have spurred adoption of the "open web", where websites can come to life, to move the web forward. Because of just how fast web browsers have gotten, and how decently powerful our little devices have gotten. WebShell doesn't use much more power than a web page, and can adjust visual effects if performance isn't doing so well. We're living in a web place now. We depend greatly on web browsers, and they can do anything now--Write documents, presentations and spreadsheets, like with Google Drive, Apple iWork for iCloud, and Microsoft Office Online. You can write code with your web browser, test it in realtime, like with Koding and others. Our storage lives in the cloud, which are being provided by a huge number of small and large players from Dropbox, Mega, Google, Apple, Microsoft, Amazon, and so on. We can do so much more in web browsers than we could have ever imagined 10 years ago, yet our operating systems haven't changed much. They're either proprietary, or difficult to customize unless you are a C++ developer. There isn't a common set of native apps for these platforms. Finally, they haven't evolved much recently, other than some minor visual overhauls and flattening. Companies have tried to change this, like Microsoft with Windows 8, and people thought the changes were way too stark. Perhaps we could do something better.

Can you even build a window manager like this? How would that work?
--------
WebShell is based on Chrome's app architecture, allowing for more powerful experiences across the board. WebShell apps are isolated, having their own set of stylesheets, and running in their own processes thanks to Chrome's architecture, just like a native app can. This is good for two reasons. One, security, because apps are completely isolated. Two, compatibility, as if this app were to run in another version of WebShell, or an entirely different distro entirely, it will still generally work perfectly. WebShell uses jQuery and jQuery UI to make it easier to manage its codebase. 

In WebShell, we support everything you'd expect from a window manager. You can open windows, drag windows around from the top, resize windows from the edges or corners, maximize windows to fill up the screen, minimize windows to the taskbar. We also have a slightly new concept for an application launcher. It currently does not have a final name, but we call it the module drawer instead. Inside the module drawer, it will have different "modules" which can be used to personalize the module drawer. The module drawer is accessed by sliding it out by clicking the WebShell button, also causing the task list to jump to the top. Currently there is only "All Apps", but there will be many more eventually, for things like quick controls, virtual desktops, and maybe even weather updates and notifications. We wanted to create a start menu replacement that was easy to get used to, and we settled on this one. It works great on tablets too, and doesn't have nearly the amount of miles on the mouse that a full screen start would have. The taskbar is an OS X/Windows/ChromeOS hybrid, and it's actually easier than it sounds. It's centered on the screen, and holds your apps. If it gets too full, you can scroll through them.

You said something about customization?
--------
One of the beauties of WebShell is its customization. It's built on HTML5, CSS3, JS and jQuery. If you're a web developer, then congratulations, you already know how to theme and tinker with WebShell. It's easy for anyone to pick up, and we're in the process of documenting the code better, to make it even easier. Of course, it's in Alpha now, so it's nowhere near ready to be an educational tool, but one day it could be.

I want to try this, how?
--------
Clone WebShell into the directory of your choosing, open a Chromium based browser, navigate to chrome://extensions, tick "Developer Mode" if you need, click "Load unpacked extension...", choose the directory you just extracted, and you're off! You can currently launch webshell via chrome://extensions or chrome://apps

I have a great idea, where should I leave it?
--------
Feel free to leave it in the "Issues" section of the GitHub page, and I'll take a look at it.

I found a bug, where should I report it?
--------
Feel free to report it in the "Issues" section of the GitHub page, and I'll take a look at it.

Will you make an actual OS/firmware out of this?
--------
We've been looking into doing just this, but we aren't sure exactly what we're going to use. It will probably be Linux based, though, and boot straight into WebShell, comparable to Chrome OS.

I have an older PC, will this run fine for me?
--------
Depends. Do you have a graphics chipset (like a video card) with decent speeds? If you do, that's great. If you have integrated graphics (such as Intel HD or Iris/Iris Pro), those will work too. However, if you don't have graphics acceleration, you'll experience some extra slowdown because it has to rely on slower software rendering instead. WebShell does adjust itself to lower performance by reducing visual effects, but software rendering slows down any operating system, especially WebShell. Generally, most CPUs are OK as long as you have an OK GPU (Unless you have a Pentium 2 or something, that will take a big performance hit). For RAM, anything above 1 GB should be decent, depending on the operating system. It's pretty easy to try WebShell for yourself, so feel free to test it out.

What about my existing apps?
--------

We're looking into building the ARC runtime into WebShell, to run Android apps inside of WebShell. Currently it isn't certain if it's 100% possible or not, but the technology is there.

We plan to make a compatibility layer to run Chrome apps inside WebShell, though!