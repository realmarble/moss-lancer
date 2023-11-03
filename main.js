let socket;

Hooks.once("socketlib.ready", () => {
	socket = socketlib.registerModule("moss-lancer");
  socket.register("briefing",Briefing)
});

Hooks.on("ready", function() {
console.log("registering stuff...")
});
function CallBrief(obj){
  socket.executeForEveryone(Briefing,obj)
}