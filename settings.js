Hooks.on("init", function (){
console.log("registering settings")
game.settings.register("moss-lancer", "StartupSound", {
    name: "Startup Sound",
    hint: "Whether to play a specific sound on startup.",
    scope: "world",     // This specifies a client-stored setting
    config: true,        // This specifies that the setting appears in the configuration view
    requiresReload: true, // This will prompt the user to reload the application for the setting to take effect.
    type: Boolean,
    default: false,        // The default value for the setting
    onChange: value => { // A callback function which triggers when the setting is changed
     console.log(value)
    }
  });
  game.settings.register("moss-lancer", "StartupSoundPath", {
    name: "Startup Sound Path",
    hint: "The Path to an Audio File that play on startup",
    scope: "world",     // This specifies a client-stored setting
    config: true,        // This specifies that the setting appears in the configuration view
    requiresReload: false, // This will prompt the user to reload the application for the setting to take effect.
    type: String,
    default: "",        // The default value for the setting
    onChange: value => { // A callback function which triggers when the setting is changed
      console.log(value)
    }
  });
  game.settings.register("moss-lancer", "ToolIcon", {
    name: "Tool Icon",
    hint: "Whether to display the module's icon in the tool list.",
    scope: "world",     // This specifies a client-stored setting
    config: true,        // This specifies that the setting appears in the configuration view
    requiresReload: true, // This will prompt the user to reload the application for the setting to take effect.
    type: Boolean,
    default: false,        // The default value for the setting
    onChange: value => { // A callback function which triggers when the setting is changed
     console.log(value)
    }
  });
  //this isnt needed right now
// game.settings.register("moss-lancer", "ModuleSettings", {
//   name: "Combat Type",
//   hint: "Whether to use standard lancer combat initiative or a dnd-esque one.",
//   scope: "world",     // This specifies a client-stored setting
//   config: true,        // This specifies that the setting appears in the configuration view
//   requiresReload: true, // This will prompt the user to reload the application for the setting to take effect.
//   type: String,
//   choices: {           // If choices are defined, the resulting setting will be a select menu
//     "default": "Lancer Initiative",
//     "dnd": "DnD Initiative"
//   },
//   default: "a",        // The default value for the setting
//   onChange: value => { // A callback function which triggers when the setting is changed
//     console.log(value)
//   }
// });
// game.settings.register("moss-lancer", "ModuleSettings", {
//   name: "Auto Damage Button",
//   hint: "Whether to display a button to deal damage under attacks that hit.",
//   scope: "world",     // This specifies a client-stored setting
//   config: true,        // This specifies that the setting appears in the configuration view
//   requiresReload: true, // This will prompt the user to reload the application for the setting to take effect.
//   type: Boolean,
//   default: "a",        // The default value for the setting
//   onChange: value => { // A callback function which triggers when the setting is changed
//     console.log(value)
//   }
// });
});