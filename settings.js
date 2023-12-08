Hooks.on("init", function (){
console.log("Moss | registering settings")
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
    },
    filePicker: true,
  });
   game.settings.register("moss-lancer", "ToolIcon", {
     name: "Tool Icon",
     hint: "Whether to display the module's icon in the tool list.",
     scope: "world",     // This specifies a client-stored setting
     config: true,        // This specifies that the setting appears in the configuration view
     requiresReload: true, // This will prompt the user to reload the application for the setting to take effect.
     type: Boolean,
     default: true,        // The default value for the setting
     onChange: value => { // A callback function which triggers when the setting is changed
      console.log(value)
     }
   });
})

Hooks.on("getSceneControlButtons", (controls) => {
  if(!game.settings.get('moss-lancer', 'ToolIcon')){return;}
  annoucement = {
   icon: "fas fa-bullhorn",
   name: "announcementeditor",
   title: "Announcement Editor",
   button: true,
   visible: true,
   onClick: () => {
     announcementeditor()
   },
 };
 briefing = {
     icon: "fas fa-clipboard",
     name: "briefingeditor",
     title: "Briefing Editor",
     button: true,
     visible: true,
     onClick: () => {
       briefingeditor()
     },
   };
   assembly = {
    icon: "fas fa-folder",
    name: "assemblyviewer",
    title: "Assembly Viewer",
    button: true,
    visible: true,
    onClick: () => {
      openAssemblyViewer()
    },
  };

 controls.push({
   name: "mossadditions",
   title: "Moss's Additions",
   icon: "fas fa-palette",
   layer: "controls",
   visible:game.user.role==4,
   tools: [annoucement,briefing,assembly],
 });
});