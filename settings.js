Hooks.on("init", function () {
  console.log(`moss-lancer | no settings to register.`)
});

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