Hooks.on("ready", function() {
//console.log("moss-lancer | registering stuff...")
    if (MOSS.LocalStorage.Read() == -1) {
        MOSS.LocalStorage.Set([]);
        console.log("moss-lancer | LocalStorage failed! Regenerating...")
    }
    //failsafe for incorrectly set up LocalStorage
});
Hooks.on("init",function() {
    if (game.settings.get("moss-lancer", "HideFoundryBeforeAnim")){
        document.body.classList.toggle("superhidden")
        document.body.style.backgroundColor = game.settings.get("moss-lancer", "CustomBackgroundColor") || "#000000"
    }
})
Hooks.on("ready", () => {
    if (game.settings.get("moss-lancer", "StartupAssembly")) {
        console.log("moss-lancer | Running Assembly on Start")
        let obj = JSON.parse(game.settings.get("moss-lancer", "StartupAssembly"))
        new MOSS.ClassReg[obj.class](obj.context).Play() //Refuses to run when launched through standard method
    if (game.settings.get("moss-lancer", "HideFoundryBeforeAnim")){
        document.body.classList.toggle("superhidden")
    }
        //MOSS.Construct(game.settings.get("moss-lancer", "StartupAssembly")).Play();
    }
});