let socket;

Hooks.once("socketlib.ready", () => {
	socket = socketlib.registerModule("moss-lancer");
  socket.register("briefing",Briefing)
  socket.register("msghandler",MessageHandler)
  socket.register("showtips",ShowTips)
  socket.register("combatannouncement",CombatPopup)
});

Hooks.on("ready", function() {
if (AssemblyStorage.Read()==null) {
  AssemblyStorage.Set([]) //AssemblyViewer setup
}
dynamicStyles=null;
console.log("registering stuff...")
AddStyle(`@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap');`) //this fixes the font issues

if (game.settings.get('moss-lancer', 'StartupSound')) {
  try {
    AudioHelper.play({src: game.settings.get('moss-lancer', 'StartupSoundPath'), volume: 1, autoplay: true, loop: false}, false); //play the file only for the current client   
  } catch (error) {
    console.log(error)
    ui.notifications.error(error)
  }
}
});
function AddStyle(body) { //this allows to add animations on runtime
  if (!dynamicStyles) {
    dynamicStyles = document.createElement("style");
    dynamicStyles.type = "text/css";
    document.head.appendChild(dynamicStyles);
  }
  dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
}
function MessageHandler(msg){
console.log(`message of type:${msg.TYPE}. Contents:${msg.message}`)
}

function CallBrief(obj){
  socket.executeForEveryone(Briefing,obj)
}
function CallAnnouncement(obj){
  socket.executeForEveryone(CombatPopup,obj)
}
function CallTips(tips){
  socket.executeForEveryone(ShowTips,tips)
}