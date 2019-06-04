WebShell
--------------
WebShell was an open-source project designed to build a general-purpose, fully-featured operating system interface upon modern web technologies, for consumers, enterprise, and even developers.

**This project is no longer actively maintained. It has served for some inspiration, and indeed borrowed code for, the ModernDeck electron app, but isn't going to be updated in the future. Plus, Chrome removed App support outside of ChromeOS, so it is becoming increasingly less practical. But, it's still a cool example of what could be possible with web technologies in the future.**


Why do I *need* an OS built upon the web?
-----
We all spend the majority of our time in a web browser. Even when we aren't, we usually run it in the background to make sure it's always ready and available. So, it would make pretty good sense to use web technologies as a starting point. Chrome OS has pioneered an internet-first architecture, but the window manager is still based on legacy window managing technologies.

Plus building off the web has a number of neat advantages I'll cover later on in this.

That's nice, but is it possible?
-------
This is probably a large reason why no one has tried to make something like this. It is, however, most certainly possible. Thanks to huge advancements in both web technology performance and compute power, most people on the internet own devices that are capable of handling this.

I don't believe you, prove to me it's possible
------
Don't think you can build a web-based interface manager? Try [Atom](https://atom.io/) or [Visual Studio Code](https://code.visualstudio.com/). Those are both web based, but feel like native apps in terms of performance, look, and feel. They're also both based off Chrome technologies (Including, but not limited to, Node.JS), and coincidentally, so is WebShell.

So it's possible, but surely there are performance tradeoffs.
--------
The short answer is *yes, but it might be worth it.*

Ever heard of [Phonebloks](https://www.youtube.com/watch?v=oDAw7vW7H0c)/[Project Ara](https://www.youtube.com/watch?v=8mhjngbsXQ0)? These neat prototype devices are built with a similar philosophy to WebShell. Open, simple, modular, built with a general purpose, but can be extended or reduced to your preference. Sure, Ara might have slightly less battery life or slightly reduced speeds than a flagship phone, or is slightly thicker, and WebShell might be slightly slower or slightly more battery-intensive than a native shell. But, as [The Verge once reported about Ara](https://youtu.be/PQqudiUdGuo?t=1m57s), to help "people [feel] that the tradeoffs are worth it". This is true to WebShell as well, the compromises to build WebShell can be worth it in the long run.

How well does the window manager work? Is it full-featured?
------
Basically, yes. It has everything you'd expect from a window manager.
* Moving around windows from the top
* Resizing windows from edges or corners
* Minimize windows
* Maximize windows
* Of course, close windows down

WebShell should, in the future, be better at adapting to other device form-factors, such as phones.

If I'm a web developer, is it easy for me to build apps for WebShell? Or customize Shell to my heart's desires?
-----
Yes and yes! WebShell was designed to be modular and easy to build upon, add to, remove from, skin, and develop for, with a common set of libraries and APIs. WebShell apps are generally isolated from the rest of the system, so they would likely function even on a future version, or even a complete fork of WebShell, unless they remove or break any dependencies, mainly libraries.

Know HTML/CSS/JS? You can build a WebShell app. The app loading functionality is currently not implemented in Alpha 1 or 2, so you'd have to hardcode them in like we currently have, but eventually WebShell would be able to detect installed apps and make them available.

What about security?
------
WebShell uses industry-standard methods of cryptography, meeting or exceeding the practices of even the most prestige tech leaders. WebShell utilizes a slightly tweaked version of SHA3, and uses a 32-byte salt. This is extremely secure compared to Windows operating systems, and even many Linux operating systems. Retrieving the password is literally impossible, and due to the salt, it will take approximately 21 quattuordecillion (that is a word) years according to howsecureismypassword.net to bruteforce the salt. However, that number is technically a lot less in practice, because the salt is supposed to be visible, but a decently secure password will help a ton. The only way to crack a WebShell password is to literally try every single possible combination (bruteforcing), which is generally ineffective in any case, especially not JavaScript. At the same time, it's still reasonably fast to log in, and you can get up and running in seconds. Every build of WebShell has security against unlocking a device with any improper credentials. This will be taken further once encryption is enabled (next paragraph). As of the time of writing this, WebShell does not have any enforced password requirements, so just be smart about it.

At the moment, WebShell does not need to encrypt any other data, but a mechanism is planned in later builds to allow for this. The idea is that we would use AES, a randomly generated private key, which would be encrypted with AES using your password+salt, so encrypted content can be accessed almost immediately after login. This architecture also has the advantage of making it easy to let you change your password if you know your old one. Instead of needing to decrypt and re-encrypt all your data, we'd only need to decrypt and re-encrypt the encryption key with your new password.

As for apps, they're run inside Chrome [WebViews](https://developer.chrome.com/apps/tags/webview), which have the security properties of Chrome, being isolated inside another process. They can't mess with WebShell's system, and can't mess with other apps, other than apps that specifically want to communicate with it in a certain way. This way, it's only possible for an app to be compromised if it's very, very insecurely written. You might as well use password, password1, 12345, or 123456 as your password. If I just mentioned your own password, please do not write a WebShell app (also, you should really change it, thank you, but *hopefully* the people reading this have basic security knowledge, which I think they do, in which this is a fun thing to read).

So yes, security is looking pretty great so far.

When will WebShell have a "finished" product?
----
It's not clear, if ever. At the moment it's still early in development. There isn't a huge demand for it at the moment, albeit it is a bit cutting-edge, as well as too early in development for it to have extreme meaning. It's mostly just an idea at the moment, a collection of ideas of what the ideal desktop interface should be, with many prototypes of little things inside.

What kinds of libraries do you use?
------
Quite a few, actually. We believe in building upon the work of others to build something amazing. The WebShell Project utilizes jQuery, jQuery UI, RequireJS, IDBStore, Materialize, FPSMeter, CryptoJS, and Bootstrap.

Will WebShell be turned into an actual OS?
------
Nothing final about this, but I'm certainly thinking about that, researching potential solutions, and planning roadmap for such a task. 
