class AssemblyViewer extends Application {
  constructor() {
    super();
  }
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["no-padding"],
      popOut: true,
      template: "modules/moss-lancer/templates/assemblyviewer.html",
      width: 716,
      height: 720,
      baseApplication: "AssemblyViewer",
      title: "Assembly Viewer",
      resizable:true
    });
  }
}
function submitGenericDialog(object){
  new Dialog({
      title: `Submit SFX`,
      content: `<h2>Enter SFX Name:</h2><br><input type="text" name="AssemblySubmitName" placeholder="Assembly Name">`,
      buttons: {
        yes: {
          label: "Submit",
          callback: () => {
              object.assemblyName = document.getElementsByName("AssemblySubmitName")[0].value
              MOSS.LocalStorage.Push(object)
              try {
                rendertiles()
              } catch (e) {
                //i dont care
                console.log('failed to render tiles:',e)
              }
          }
        },
        no: {
          label: "Cancel",
          callback: () => {
          }
        }
      },
        default: 'no',
    }).render(true)    
}