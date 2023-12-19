let socket;

Hooks.once("socketlib.ready", () => {
	socket = socketlib.registerModule("moss-lancer");
  socket.register("briefing",Briefing)//with RenderApplication this can be implemented a different way
  socket.register("msghandler",MessageHandler)
  socket.register("showtips",ShowTips)
  socket.register("combatannouncement",CombatPopup)
  socket.register("OpenFrameViewer",OpenFrameViewer)
  console.log("Moss | registering socket functions...")
});

Hooks.on("ready", function() {
if (AssemblyStorage.Read()==null) {
  AssemblyStorage.Set([]) //AssemblyViewer setup
}
dynamicStyles=null;
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
function AddStyle(body) { //this allows to add css stuff on runtime
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
function CallRenderApplication(object){
  socket.executeForEveryone(RenderApplication,object)
}
function CallFrameViewer(link){
  socket.executeForEveryone(OpenFrameViewer,link)
}