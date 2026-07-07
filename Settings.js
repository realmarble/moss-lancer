//V13 is here! time to use this..
Hooks.on("getSceneControlButtons", (controls) => {
  if (game.user.isGM) {
    Controls = {
      name: "moss",
      order: 5,
      title: "Moss's Additions",
      icon: "fas fa-palette",
      tools: {},
    };
    Controls.tools.editor = {
      name: "editor",
      title: "Editor",
      icon: "fa-solid fa-file-contract",
      onChange: async () => {
        if (MOSS.editor){
          MOSS.editor.close();
          MOSS.editor = null;
        } else {
          MOSS.editor = await new EditorV2().render(true);
        }
      },
      button: true,
    };
    Controls.tools.assembly = {
      name: "assembly",
      title: "Assembly Viewer",
      icon: "fas fa-folder",
      onChange: async () => {
        if (MOSS.assemblyViewer){
          MOSS.assemblyViewer.close();
          MOSS.assemblyViewer = null;
        } else {
          MOSS.assemblyViewer = await new AssemblyViewer().render(true);
        }
      },
      button: true,
    };
    controls.moss = Controls; //push group to actual controls
  }
});

Hooks.once("init", () => {
    console.log(`moss-lancer | registering settings.`)
    game.settings.register("moss-lancer", "StartupAssembly", {
        name: "Startup Assembly",
        hint: "The Effect Assembly to be played on world load.",
        scope: "world",
        config: true,
        type: String,
        default: null,
    });
    game.settings.register("moss-lancer", "HideFoundryBeforeAnim", {
        name: "Hide Foundry Before Animation",
        hint: "Whether to hide the Foundry UI before playing the startup animation.",
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
    });
    game.settings.register("moss-lancer", "CustomBackgroundColor", {
        name: "Custom Background Color",
        hint: "Use this so match the background color of the instance to your assembly.",
        scope: "world",
        config: true,
        type: String,
        default: "#000000",
    });
  });