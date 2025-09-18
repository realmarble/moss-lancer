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
class LocalStorage {
  constructor(key) {
    this.key = key;
  }
  Set(object) {
    localStorage.setItem(this.key, JSON.stringify(object)); 
  }
  Flush() {
    localStorage.setItem(this.key, []);
    console.log(`Flushed Storage of key ${this.key}`)
  }
  Read() {
    try {
      return JSON.parse(localStorage.getItem(this.key));  
    } catch (error) {
      return []
    }}
  Push(object) {
    var AssemblyStorageTemp = JSON.parse(localStorage.getItem(this.key));
    object.id = foundry.utils.randomID(10); //safer
    AssemblyStorageTemp.push(object);
    localStorage.setItem(this.key, JSON.stringify(AssemblyStorageTemp));
  }
  Delete(id) {
    var AssemblyStorageTemp = JSON.parse(
      localStorage.getItem(this.key)
    );
    var index = AssemblyStorageTemp.findIndex((element) => element.id === id);
    if (index !== -1) {
      // Use splice to remove the element from the array
      AssemblyStorageTemp.splice(index, 1);
      localStorage.setItem(
        this.key,
        JSON.stringify(AssemblyStorageTemp)
      );
      return true;
    } else {
      return false;
    }
  }
  Update(id, object) {
    var AssemblyStorageTemp = JSON.parse(
      localStorage.getItem(this.key)
    );
    var index = AssemblyStorageTemp.findIndex((element) => element.id === id);
    if (index !== -1) {
      // Use splice to remove the element from the array
      AssemblyStorageTemp[index] = object;
      localStorage.setItem(
        this.key,
        JSON.stringify(AssemblyStorageTemp)
      );
      return true;
    } else {
      return false;
    }
  }
}
const AssemblyStorage = new LocalStorage("moss.AssemblyStorage")
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
function submitGenericDialog(object,displayname,savetype){
  new Dialog({
      title: `Submit ${displayname}`,
      content: `<h2>Enter ${displayname} Name:</h2><br><input type="text" name="AssemblySubmitName" placeholder="Assembly Name">`,
      buttons: {
        yes: {
          label: "Submit",
          callback: () => {
              //object.MetaData = {}
              object.assemblyName = document.getElementsByName("AssemblySubmitName")[0].value
              object.assemblyType =savetype
              AssemblyStorage.Push(object)
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
async function AssemblyEditor(id,object){
  new Dialog({
    title: "Assembly Editor",
    content: await renderTemplate("modules/moss-lancer/templates/assemblyeditor.hbs", {id:id,object:JSON.stringify(object)}),
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