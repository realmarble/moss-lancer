# SETUP
setting this up requires some handywork on your part.
first, open your foundry vtt directory, go to the systems/lancer folder, and in drop the files **typeit.js** and **animatedbriefing.js** in there.
next, open the systems.json file and add the filenames to the scripts array. it should look something like this:

![image](https://github.com/realmarble/moss-lancer/assets/42872133/92f66d26-cfb7-40e9-90cd-5e55fc02d700)

after that, add the macro in this folder to your world and you're ready to go. Once you click the macro, you will see a text box and a button that says OPEN BRIEF.
after you paste the json object containing the details of your brief (example included [here](examplebrief.json)),
when you click the open brief button, the briefing will be shown to every connected player, including the GM (you.)
That's it! have fun!
