Hooks.on("init", function () {
  console.log("Moss | registering settings");
  game.settings.register("moss-lancer", "StartupSound", {
    name: "Startup Sound",
    hint: "Whether to play a specific sound on startup.",
    scope: "world", // This specifies a client-stored setting
    config: true, // This specifies that the setting appears in the configuration view
    requiresReload: true, // This will prompt the user to reload the application for the setting to take effect.
    type: Boolean,
    default: false, // The default value for the setting
    onChange: (value) => {
      // A callback function which triggers when the setting is changed
      console.log(value);
    },
  });
  game.settings.register("moss-lancer", "StartupSoundPath", {
    name: "Startup Sound Path",
    hint: "The Path to an Audio File that play on startup",
    scope: "world", // This specifies a client-stored setting
    config: true, // This specifies that the setting appears in the configuration view
    requiresReload: false, // This will prompt the user to reload the application for the setting to take effect.
    type: String,
    default: "", // The default value for the setting
    onChange: (value) => {
      // A callback function which triggers when the setting is changed
      console.log(value);
    },
    filePicker: true,
  });
  game.settings.register("moss-lancer", "ToolIcon", {
    name: "Tool Icon",
    hint: "Whether to display the module's icon in the tool list.",
    scope: "world", // This specifies a client-stored setting
    config: true, // This specifies that the setting appears in the configuration view
    requiresReload: true, // This will prompt the user to reload the application for the setting to take effect.
    type: Boolean,
    default: true, // The default value for the setting
    onChange: (value) => {
      // A callback function which triggers when the setting is changed
      console.log(value);
    },
  });
});

Hooks.on("getSceneControlButtons", (controls) => {
  if (game.user.isGM) {
    Controls = {
      name: "moss",
      order: 5,
      title: "Moss's Additions",
      icon: "fas fa-palette",
      tools: {},
    };
    Controls.tools.announcementeditor = {
      name: "announcementeditor",
      title: "Announcement Editor",
      icon: "fas fa-bullhorn",
      onChange: async () => {
        if (MOSS.announcementeditor){
          MOSS.announcementeditor.close();
          MOSS.announcementeditor = null;
        } else {
          MOSS.announcementeditor = await new AnnouncementEditor().render(true);
        }
      },
      button: true,
    };
    Controls.tools.briefingeditor = {
      name: "briefingeditor",
      title: "Briefing Editor",
      icon: "fas fa-clipboard",
      onChange: async () => {
        if (MOSS.briefingeditor){
          MOSS.briefingeditor.close();
          MOSS.briefingeditor = null;
        } else {
          MOSS.briefingeditor = await new BriefingEditor().render(true);
        }
      },
      button: true,
    };
    Controls.tools.doceditor = {
      name: "doceditor",
      title: "Document Editor",
      icon: "fas fa-file-contract",
      onChange: async () => {
        if (MOSS.doceditor){
          MOSS.doceditor.close();
          MOSS.doceditor = null;
        } else {
          MOSS.doceditor = await new DocumentEditor().render(true);
        }
      },
      button: true,
    };
    Controls.tools.assemblyviewer = {
      name: "assemblyviewer",
      title: "Assembly Viewer",
      icon: "fas fa-folder",
      onChange: async () => {
        if (MOSS.assemblyviewer) {
          MOSS.assemblyviewer.close();
          MOSS.assemblyviewer = null;
        } else {
          MOSS.assemblyviewer = await new AssemblyViewer().render(true);
        }
      },
      button: true,
    };

    controls.moss = Controls; //push group to actual controls
  }
});