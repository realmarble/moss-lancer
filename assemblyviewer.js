class AssemblyViewer extends Application {
  constructor() {
    super();
  }
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["no-padding"],
      popOut: true,
      template: "modules/moss-lancer/templates/assemblyviewer.html",
      width: 700,
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
    localStorage.setItem("moss.AssemblyStorage", "");
  },
  Read: () => {
    return JSON.parse(localStorage.getItem("moss.AssemblyStorage"));
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
                object.AssemblyType ="Briefing"
                AssemblyStorage.Push(object)
            }
          },
          no: {
            label: "Cancel",
            callback: () => {}
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
                object.AssemblyType ="Warning"
                AssemblyStorage.Push(object)
            }
          },
          no: {
            label: "Cancel",
            callback: () => {}
          }
        },
          default: 'no',
      }).render(true)    
}