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
    });
  }
}
function openAssemblyViewer() {
  new AssemblyViewer().render(true);
}

const AssemblyStorage = {
  Set: (object) => {
    localStorage.setItem("moss.AssemblyStorage", JSON.stringify(object));
  },
  Flush: () => {
    localStorage.setItem("moss.AssemblyStorage", []);
  },
  Read: () => {
    try {
      return JSON.parse(localStorage.getItem("moss.AssemblyStorage"));  
    } catch (error) {
      return []
    }
    
  },
  Push: (object) => {
    AssemblyStorageTemp = JSON.parse(
      localStorage.getItem("moss.AssemblyStorage")
    );
    l = AssemblyStorageTemp.length;
    object.id = l;
    AssemblyStorageTemp.push(object);
    localStorage.setItem(
      "moss.AssemblyStorage",
      JSON.stringify(AssemblyStorageTemp)
    );
  },
  Delete: (id) => {
    AssemblyStorageTemp = JSON.parse(
      localStorage.getItem("moss.AssemblyStorage")
    );
    index = AssemblyStorageTemp.findIndex((element) => element.id === id);
    if (index !== -1) {
      // Use splice to remove the element from the array
      AssemblyStorageTemp.splice(index, 1);
      localStorage.setItem(
        "moss.AssemblyStorage",
        JSON.stringify(AssemblyStorageTemp)
      );
      return true;
    } else {
      return false;
    }
  },
  Update: (id, object) => {
    AssemblyStorageTemp = JSON.parse(
      localStorage.getItem("moss.AssemblyStorage")
    );
    index = AssemblyStorageTemp.findIndex((element) => element.id === id);
    if (index !== -1) {
      // Use splice to remove the element from the array
      AssemblyStorageTemp[index] = object;
      localStorage.setItem(
        "moss.AssemblyStorage",
        JSON.stringify(AssemblyStorageTemp)
      );
      return true;
    } else {
      return false;
    }
  },
};
function submitBriefingDialog(object){
    new Dialog({
        title: "Submit Briefing",
        content: `<h2>Enter Briefing Name:</h2><br><input type="text" name="AssemblySubmitName" placeholder="Assembly Name">`,
        buttons: {
          yes: {
            label: "Submit",
            callback: () => {
                object.assemblyName = document.getElementsByName("AssemblySubmitName")[0].value
                object.assemblyType ="Briefing"
                AssemblyStorage.Push(object)
                try {
                  rendertiles()
                } catch (e) {
                  //i dont care
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
function submitWarningDialog(object){
    new Dialog({
        title: "Submit Warning",
        content: `<h2>Enter Warning Name:</h2><br><input type="text" name="AssemblySubmitName" placeholder="Assembly Name">`,
        buttons: {
          yes: {
            label: "Submit",
            callback: () => {
                object.assemblyName = document.getElementsByName("AssemblySubmitName")[0].value
                object.assemblyType ="Warning"
                AssemblyStorage.Push(object)
                try {
                  rendertiles()
                } catch (e) {
                  //i dont care
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
async function AssemblyEditor(id,object){
  new Dialog({
    title: "Assembly Editor",
    content: await renderTemplate("modules/moss-lancer/templates/assemblyeditor.hbs", {id:id,object:object}),
    buttons: {
      yes: {
        label: "Save Changes",
        callback: () => {
          AssemblyStorage.Update(id,JSON.parse(document.getElementsByName("assemblyeditortext")[0].value));try {rendertiles()} catch (e) {};
        }
      }
    },
      default: 'yes',
  },{width: 716,height: 720 }).render(true)  
}
async function DeleteConfirm(id) {
  const confirmation = await Dialog.prompt({
    content: "Delete Assembly?"
  });

  if (!confirmation) {
    return;
  }

  AssemblyStorage.Delete(id);
  rendertiles();
}