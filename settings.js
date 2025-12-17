Hooks.on("init", function () {
  console.log(`moss-lancer | no settings to register.`)
});

// this technically is code for V13
// Hooks.on("getSceneControlButtons", (controls) => {
//   if (game.user.isGM) {
//     Controls = {
//       name: "moss",
//       order: 5,
//       title: "Moss's Additions",
//       icon: "fas fa-palette",
//       tools: {},
//     };
//     Controls.tools.announcementeditor = {
//       name: "announcementeditor",
//       title: "Announcement Editor",
//       icon: "fas fa-bullhorn",
//       onChange: async () => {
//         if (MOSS.announcementeditor){
//           MOSS.announcementeditor.close();
//           MOSS.announcementeditor = null;
//         } else {
//           MOSS.announcementeditor = await new AnnouncementEditor().render(true);
//         }
//       },
//       button: true,
//     };
//     Controls.tools.briefingeditor = {
//       name: "briefingeditor",
//       title: "Briefing Editor",
//       icon: "fas fa-clipboard",
//       onChange: async () => {
//         if (MOSS.briefingeditor){
//           MOSS.briefingeditor.close();
//           MOSS.briefingeditor = null;
//         } else {
//           MOSS.briefingeditor = await new BriefingEditor().render(true);
//         }
//       },
//       button: true,
//     };
//     Controls.tools.doceditor = {
//       name: "doceditor",
//       title: "Document Editor",
//       icon: "fas fa-file-contract",
//       onChange: async () => {
//         if (MOSS.doceditor){
//           MOSS.doceditor.close();
//           MOSS.doceditor = null;
//         } else {
//           MOSS.doceditor = await new DocumentEditor().render(true);
//         }
//       },
//       button: true,
//     };
//     Controls.tools.assemblyviewer = {
//       name: "assemblyviewer",
//       title: "Assembly Viewer",
//       icon: "fas fa-folder",
//       onChange: async () => {
//         if (MOSS.assemblyviewer) {
//           MOSS.assemblyviewer.close();
//           MOSS.assemblyviewer = null;
//         } else {
//           MOSS.assemblyviewer = await new AssemblyViewer().render(true);
//         }
//       },
//       button: true,
//     };

//     controls.moss = Controls; //push group to actual controls
//   }
// });
Hooks.on("getSceneControlButtons", (controls) => {
  editor = {
    icon: "fa-solid fa-file-contract",
    name: "editor",
    title: "Editor",
    button: true,
    visible: true,
    onClick: () => {
      new Editor().render(true)
    },
  };
   assembly = {
    icon: "fas fa-folder",
    name: "assembly",
    title: "Assembly Viewer",
    button: true,
    visible: true,
    onClick: () => {
      new AssemblyViewer().render(true)
    },
  };

 controls.push({
   name: "mossadditions",
   title: "Moss's Additions",
   icon: "fas fa-palette",
   layer: "controls",
   visible:game.user.role==4,
   tools: [editor,assembly],
 });
});