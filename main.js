let socket;

Hooks.once("socketlib.ready", () => {
	socket = socketlib.registerModule("moss-lancer");
  socket.register("briefing",Briefing)
  socket.register("msghandler",MessageHandler)
  socket.register("showtips",ShowTips)
  socket.register("combatannouncement",CombatPopup)
});

Hooks.on("ready", function() {
console.log("registering stuff...")
});
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