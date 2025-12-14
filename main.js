let socket;
Hooks.on("ready", function() {
console.log("Moss | registering stuff...")

if (game.settings.get('moss-lancer', 'StartupSound')) {
  try {
    AudioHelper.play({src: game.settings.get('moss-lancer', 'StartupSoundPath'), volume: 1, autoplay: true, loop: false}, false); //play the file only for the current client   
  } catch (error) {
    console.log(error)
    ui.notifications.error(error)
  }
}


});
