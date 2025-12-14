class SocketManager {
    constructor(){
        this.socket = socketlib.registerModule("moss-lancer");
        this.socket.register("Wrapper",CoreWrapper)
    }
    PlayEffect(SFX){
        this.socket.executeForOthers(CoreWrapper,JSON.stringify(SFX))
        SFX.Play()
    }
}
function CoreWrapper(json){
    MOSS.Construct(JSON.parse(json)).Play()
}
Hooks.once("socketlib.ready", () => {MOSS.Socket = new SocketManager()});
