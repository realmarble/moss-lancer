let socket;

Hooks.once("socketlib.ready", () => {
	socket = socketlib.registerModule("moss-lancer");
  socketfuncs =[
  Briefing,
  CombatPopup,
  OpenFrameViewer,
  OpenDocument,
  SFX,
  eval
  ]
  socketfuncs.forEach(element => {
    socket.register(element.name,element)
  });

});

Hooks.on("ready", function() {
if (AssemblyStorage.Read()==null) {
  AssemblyStorage.Set([]) //AssemblyViewer setup
}
dynamicStyles=null;
console.log("Moss | registering stuff...")
console.log(`Moss | Version ${MOSS.ModuleVer}`)

if (game.settings.get('moss-lancer', 'StartupSound')) {
  try {
    AudioHelper.play({src: game.settings.get('moss-lancer', 'StartupSoundPath'), volume: 1, autoplay: true, loop: false}, false); //play the file only for the current client   
  } catch (error) {
    console.log(error)
    ui.notifications.error(error)
  }
}

if (game.user.role==4) { //if user is GM
  console.log("Moss | Mounted Interactive Message Listener")
  game.socket.on("module.moss-lancer", (data)=>{
    if (data.type == "interactivemsg") {
      ui.notifications.info(`Message Callback: ${data.content}`)
    }
  });  
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
function CallOpenDocument(data){
  socket.executeForEveryone(OpenDocument,data)
}
function CallSFX(obj){
  socket.executeForEveryone(SFX,obj)
}
function CallEval(obj){
  socket.executeForEveryone(eval,obj.expression) //warning. this is a dangerous function, and use this only if necessary.
}