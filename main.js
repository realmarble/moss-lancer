Hooks.on("ready", function() {
//console.log("moss-lancer | registering stuff...")
    if (MOSS.LocalStorage.Read() == -1) {
        MOSS.LocalStorage.Set([]);
        console.log("moss-lancer | LocalStorage failed! Regenerating...")
    }
    //failsafe for incorrectly set up LocalStorage
});
Hooks.on("init",function() {
})
