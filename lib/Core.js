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
  Push(object) {//takes json now i guess 
    var AssemblyStorageTemp = JSON.parse(localStorage.getItem(this.key));
    object.AssemblyID = foundry.utils.randomID(10); //safer
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
class MossLancer {
    LocalStorage;
    Version = "0.1"
    Socket;
    constructor(){
        this.ClassReg = {}
        this.LocalStorage = new LocalStorage("moss.AssemblyStorage")
            this.Config = {
      EditorConfigs : {
  Briefing : {
  layout: [
    { DisplayName: "Classic", Name: "classic" },
    { DisplayName: "Text Display", Name: "text" }
  ],
  intro: [
    { DisplayName: "None", Name: "none" },
    { DisplayName: "Loadscreen", Name: "loadscreen" },
    { DisplayName: "Logo", Name: "logo" },
    { DisplayName: "Brigador", Name: "brigador" },
    { DisplayName: "Encrypted", Name: "encrypted" },
    { DisplayName: "Directive", Name: "directive" },
  ],
},
Warning : {
    type:[
    { DisplayName: "Standard", Name: "WarningStandard" },
    { DisplayName: "Airforce", Name: "WarningAirforce" },
    //{ DisplayName: "Meltdown", Name: "meltdown" },
    ]
},
SFX : {
  effects: [
    { DisplayName: "Warning Stripes", Name: "WarningStripes" },
    { DisplayName: "Corner Display", Name: "CornerDisplay" },
    { DisplayName: "Midnight Office", Name: "CornerDisplayMidnight"},
    { DisplayName: "Image Flash", Name: "VineThud"},
  ]
},
Misc : {
  types : [
    { DisplayName: "HTML Document", Name: "DocumentStandard" },
  ]
}
}};
this.Config.EditorAssemblies = {
  BriefingEditor:{
    "Name":"Briefing Editor",
    "DataSections":[
      {
        "Name":"intro",
        "DisplayName":"Intro Options",
        "type":"select",
        "data":this.Config.EditorConfigs.Briefing.intro,
        "onchange":async function () {
      let introoptions = document.getElementById("introoptions");
      try {
        introoptions.innerHTML = await renderTemplate(`modules/moss-lancer/templates/briefings/settingtemplates/intro/${this.value}.html`,{})
        let inputs = Array.prototype.slice.call(document.getElementById("introoptions").getElementsByTagName("input")).concat(Array.prototype.slice.call(document.getElementById("introoptions").getElementsByTagName("textarea")));
        inputs.forEach(element => {
          if (element.hasAttribute("filepicker")) {
            addFilePicker(element)
          }
        });
      } catch (error) {
        introoptions.innerHTML = "";
        console.error(error)
      }
    }
      },
      {
        "Name":"briefing",
        "DisplayName":"Briefing Options",
        "type":"select",
        "data":this.Config.EditorConfigs.Briefing.layout,
        "onchange":async function () {
            let briefingoptions = document.getElementById("briefingoptions");
            try {
              briefingoptions.innerHTML = await renderTemplate(`modules/moss-lancer/templates/briefings/settingtemplates/layout/${this.value}.html`,{})
              let inputs = Array.prototype.slice.call(document.getElementById("briefingoptions").getElementsByTagName("input")).concat(Array.prototype.slice.call(document.getElementById("briefingoptions").getElementsByTagName("textarea")));
              inputs.forEach(element => {
                if (element.hasAttribute("filepicker")) {
                  addFilePicker(element)
                }
              });
            } catch (error) {
              briefingoptions.innerHTML = "";
              console.error(error)
            }
          }
      },
      {
        "Name":"intro",
        "DisplayName":"Intro Data",
        "type":"input"
      },
      {
        "Name":"briefing",
        "DisplayName":"Briefing Data",
        "type":"input",
        "content":`  <input type="text" name="ClientName" placeholder="Name of the Client" />
        <div style="display: inline"><input style="width: calc(100% - 50px);" type="text" name="ClientLogo" placeholder="logo of the client"><br/>
        <textarea
          name="ClientDescription"
          placeholder="Description of the Client"
          style="width: 100%; height: 150px"
        ></textarea>
        <textarea
          name="MissionDescription"
          placeholder="Description of the Mission"
          style="width: 100%; height: 150px"
        ></textarea>
        <textarea
          name="AdditionalDescription"
          placeholder="Complementary Mission Info"
          style="width: 100%; height: 150px"
        ></textarea>
        <textarea
          name="PaymentInfo"
          placeholder="Payment Information"
          style="width: 100%; height: 150px"
        ></textarea>
        <textarea
          name="AdditionalPaymentInfo"
          placeholder="Additional Payment Information"
          style="width: 100%; height: 150px"
        ></textarea>
        <input
          type="text"
          name="PaymentFlavour"
          placeholder="Payment Flavour Text"
        />
        <textarea array
          name="DeployedForces"
          placeholder='Deployed Forces (One per line)'
          style="width: 100%; height: 150px"
        ></textarea>
        <textarea array
          name="Objectives"
          placeholder="Mission Objectives (One per line)"
          style="width: 100%; height: 150px"
        ></textarea>
        <textarea array
          name="Notes"
          placeholder="Mission Notes (One per line)"
          style="width: 100%; height: 150px"
        ></textarea>
        Background Color:<input
          type="color"
          name="BackgroundColor"
          value="#0c0c1d"
        /><br />
        Background Accent:<input
          type="color"
          name="BackgroundAccent"
          value="#1E1E48"
        /><br />
        Text Color:<input type="color" name="TextColor" value="#FFFFFF" /><br />
        Border Color:<input type="color" name="BorderColor" value="#C0C0C0" />`
      },
      {
        "Name":"generator",
        "DisplayName":"Generate Briefing",
        "type":"button",
        "closediv":true,
        "onclick":function () {
          var briefobject = {};
      //build a list of the inputs and sort them into the object
      let briefingoptions = Array.prototype.slice
        .call(
          document.getElementById("briefingoptions").getElementsByTagName("input")
        )
        .concat(
          Array.prototype.slice.call(
            document
              .getElementById("briefingoptions")
              .getElementsByTagName("textarea")
          )
        );
      briefingoptions.forEach((element) => {
        try {
          if (element.hasAttribute("array")) {
            briefobject[element.name] = element.value.split('\n').filter(line => line.trim() !== '');
          } else {
            briefobject[element.name] = JSON.parse(element.value);
          }
        } catch (error) {
          briefobject[element.name] = element.value;
        }
      });
      briefobject.LayoutType = document.getElementById("briefingtype").value
      if (document.getElementById("introtype").value != "none") {
        briefobject.Intro = true;
        briefobject.IntroData = {};
        briefobject["IntroData"].type =
          document.getElementById("introtype").value;
        let introoptions = Array.prototype.slice
          .call(document.getElementById("introoptions").getElementsByTagName("input")) //get all inputs
          .concat(Array.prototype.slice.call(document.getElementById("introoptions").getElementsByTagName("textarea"))); //get all textareas
        introoptions.forEach((element) => {
          try {
            if (element.hasAttribute("array")) {
              briefobject["IntroData"][element.name] = element.value.split('\n').filter(line => line.trim() !== '');
            } else {
              briefobject["IntroData"][element.name] = JSON.parse(element.value);
            }
          } catch (error) {
            briefobject["IntroData"][element.name] = element.value;
          }
        });
      }
      document.getElementById("editdisplay").value = JSON.stringify(
        {
          class: "Briefing",
          context: briefobject
        },
        null,
        3
      );
    }
      }
    ],
    "ViewConfig":{
    TextAreaID:"brieftextdisplay",
    TextAreaPlaceholder:"This is where the code for your briefing will show.",
    Buttons:[
      {
        Name:"save",
        DisplayName:"Save",
        onclick:function () {submitGenericDialog(JSON.parse(document.getElementById('brieftextdisplay').value),"Briefing","Briefing");}
      },
      {
        Name:"preview",
        DisplayName:"Preview",
        onclick:function () {new Briefing(JSON.parse(document.getElementById('brieftextdisplay').value)).Play()}
      }
    ]
    },
    AfterRender:function (){
      addFilePicker(document.querySelector("input[name=ClientLogo]"))
    }
  },
  WarningEditor:{
    "Name":"Warning Editor",
    "DataSections":[
        {
            "Name":"announcement",
            "DisplayName":"Announcement Type Options",
            "type":"select",
            "data":this.Config.EditorConfigs.Warning.type,
            "onchange":async function () {
                let warningobject = {};
                let introoptions = document.getElementById("announcementoptions");
              
                try {
                    introoptions.innerHTML = await renderTemplate(`modules/moss-lancer/templates/warnings/settingtemplates/${this.value}.html`,{})
                    let inputs = Array.prototype.slice.call(document.getElementById("announcementoptions").getElementsByTagName("input")).concat(Array.prototype.slice.call(document.getElementById("announcementoptions").getElementsByTagName("textarea")));
                    inputs.forEach(element => {
                      if (element.hasAttribute("filepicker")) {
                        addFilePicker(element)
                      }
                    });
                  } catch (error) {
                    introoptions.innerHTML = "";
                    console.error(error)
                  }
                }
        },
        {
            "Name":"announcement",
            "DisplayName":"Announcement Options",
            "type":"input",
            "content":`Stripes:<input type="checkbox" id="stripescheckbox"><br>
            <input type="hidden" name="Stripes" value="false"/>
            <div style="display: inline"><input style="width: calc(100% - 50px);" type="text" name="Emblem" placeholder="Path to your emblem"><br/></div>
            <input type="text" name="Title" placeholder="Warning Title"><br/>
            <input type="text" name="Action" placeholder="content of Highlighted Text"><br/>
            <input type="text" name="Message" placeholder="Message (lowest line)"><br/>
            Text Color:<input type="color" name="TextColor" value="#FFFFFF" /><br/>
            Border Color:<input type="color" name="BorderColor" value="#000000" /><br/>
            Action Color:<input type="color" name="ActionColor" value="#DFFF00"/>`
            
        },
        {
            "Name":"generator",
            "DisplayName":"Generate Warning",
            "type":"button",
            "onclick":function () {
                let warningobject = {};
                //build a list of the inputs and sort them into the object
                let optionvalues = Array.prototype.slice.call(document.getElementById("announcementoptions").querySelectorAll("input[name]")).concat(Array.prototype.slice.call(document.getElementById("announcementoptions").querySelectorAll("textarea[name]")));
                
                optionvalues.forEach((element) => {
                  try {
                    if (element.hasAttribute("array")) {
                      warningobject[element.name] = element.value.split('\n').filter(line => line.trim() !== '');
                    } else {
                      warningobject[element.name] = JSON.parse(element.value);
                    }
                  } catch (error) {
                    warningobject[element.name] = element.value;
                  }
                });
                document.getElementById("editdisplay").value = JSON.stringify(
                  {
                    class: document.getElementById("announcementtype").value,
                    context : warningobject
                  },
                  null,
                  3
                );
              }
          }

    ],
    "ViewConfig":{
        TextAreaID:"warningtextdisplay",
        TextAreaPlaceholder:"This is where the code for your warning will show.",
        Buttons:[
            {
            Name:"save",
            DisplayName:"Save",
            onclick:function () {submitGenericDialog(JSON.parse(document.getElementById('warningtextdisplay').value),"Warning","Warning");}
            },
            {
                Name:"preview",
                DisplayName:"Preview",
                onclick:function () {
                    CombatPopup(JSON.parse(document.getElementById('warningtextdisplay').value))
                }
            }
        ]
        },
    AfterRender:function (){
        addFilePicker(document.querySelector("input[name=Emblem]"))
        var checkbox = document.querySelector("input[id=stripescheckbox]");
checkbox.addEventListener('change', function() {
  if (this.checked) {
    document.querySelector("input[name=Stripes]").value = true
  } else {
    document.querySelector("input[name=Stripes]").value = false
  }
})
    }
  },
    SFXEditor:{
    "Name":"SFX Editor",
    "DataSections":[
        {
            "Name":"sfx",
            "DisplayName":"SFX type",
            "type":"select",
            "data":this.Config.EditorConfigs.SFX.effects,
            "onchange":async function () {
                let object = {};
                let introoptions = document.getElementById("sfxoptions");
              
                try {
                    introoptions.innerHTML = await renderTemplate(`modules/moss-lancer/templates/sfx/settingtemplates/${this.value}.html`,{})
                    let inputs = Array.prototype.slice.call(document.getElementById("sfxoptions").getElementsByTagName("input")).concat(Array.prototype.slice.call(document.getElementById("sfxoptions").getElementsByTagName("textarea")));
                    inputs.forEach(element => {
                      if (element.hasAttribute("filepicker")) {
                        addFilePicker(element)
                      }
                    });
                  } catch (error) {
                    introoptions.innerHTML = "";
                    console.error(error)
                  }
                }
        },
        {
            "Name":"sfx",
            "DisplayName":"Effect Options",
            "type":"input",
            "content":`<input type="text" name="Word" placeholder="The word do be displayed on the stripes.">
<input type="hidden" name="time" value="3550">
<input type="hidden" name="WordCount" value="20">
Text Color:<input type="color" name="text" value="#000" /><br />
Background Color:<input type="color" name="background" value="#AEFF00" />`
            
        },
        {
            "Name":"generator",
            "DisplayName":"Generate Effect",
            "type":"button",
            "onclick":function () {
                let object = {};
                //build a list of the inputs and sort them into the object
                let optionvalues = Array.prototype.slice.call(document.getElementById("sfxoptions").querySelectorAll("input[name]")).concat(Array.prototype.slice.call(document.getElementById("sfxoptions").querySelectorAll("textarea[name]")));
                
                optionvalues.forEach((element) => {
                  try {
                    if (element.hasAttribute("array")) {
                      object[element.name] = element.value.split('\n').filter(line => line.trim() !== '');
                    } else {
                      object[element.name] = JSON.parse(element.value);
                    }
                  } catch (error) {
                    object[element.name] = element.value;
                  }
                });
                document.getElementById("editdisplay").value = JSON.stringify(
                  {
                    class: document.getElementById("sfxtype").value,
                    context : object
                  },
                  null,
                  3
                );
              }
          }

    ],
    "ViewConfig":{
        TextAreaID:"sfxtextdisplay",
        TextAreaPlaceholder:"This is where the code for your Effect will show.",
        Buttons:[
            {
            Name:"save",
            DisplayName:"Save",
            onclick:function () {submitGenericDialog(JSON.parse(document.getElementById('sfxtextdisplay').value),"SFX","SFX");}
            },
            {
                Name:"preview",
                DisplayName:"Preview",
                onclick:function () {
                    SFX(JSON.parse(document.getElementById('sfxtextdisplay').value))
                }
            }
        ]
        },
    AfterRender:function (){

    }
  },
  MiscEditor:{
    "Name":"Misc. Editor",
    "DataSections":[
        {
            "Name":"misc",
            "DisplayName":"Effect Type",
            "type":"select",
            "data":this.Config.EditorConfigs.Misc.types,
            "onchange":async function () {
                let object = {};
                let introoptions = document.getElementById("miscoptions");
              
                try {
                    introoptions.innerHTML = await renderTemplate(`modules/moss-lancer/templates/misc/settingtemplates/${this.value}.html`,{})
                    let inputs = Array.prototype.slice.call(document.getElementById("miscoptions").getElementsByTagName("input")).concat(Array.prototype.slice.call(document.getElementById("miscoptions").getElementsByTagName("textarea")));
                    inputs.forEach(element => {
                      if (element.hasAttribute("filepicker")) {
                        addFilePicker(element)
                      }
                    });
                  } catch (error) {
                    introoptions.innerHTML = "";
                    console.error(error)
                  }
                }
        },
        {
            "Name":"misc",
            "DisplayName":"Effect Options",
            "type":"input",
            "content":`<textarea name="Content" placeholder="HTML"></textarea>`
            
        },
        {
            "Name":"generator",
            "DisplayName":"Generate Effect",
            "type":"button",
            "onclick":function () {
                let object = {};
                //build a list of the inputs and sort them into the object
                let optionvalues = Array.prototype.slice.call(document.getElementById("miscoptions").querySelectorAll("input[name]")).concat(Array.prototype.slice.call(document.getElementById("miscoptions").querySelectorAll("textarea[name]")));
                
                optionvalues.forEach((element) => {
                  try {
                    if (element.hasAttribute("array")) {
                      object[element.name] = element.value.split('\n').filter(line => line.trim() !== '');
                    } else {
                      object[element.name] = JSON.parse(element.value);
                    }
                  } catch (error) {
                    object[element.name] = element.value;
                  }
                });
                document.getElementById("editdisplay").value = JSON.stringify(
                  {
                    class: document.getElementById("misctype").value,
                    context : object
                  },
                  null,
                  3
                );
              }
          }

    ],
    "ViewConfig":{
        TextAreaID:"sfxtextdisplay",
        TextAreaPlaceholder:"This is where the code for your Effect will show.",
        Buttons:[
            {
            Name:"save",
            DisplayName:"Save",
            onclick:function () {submitGenericDialog(JSON.parse(document.getElementById('sfxtextdisplay').value),"SFX","SFX");}
            },
            {
                Name:"preview",
                DisplayName:"Preview",
                onclick:function () {
                    SFX(JSON.parse(document.getElementById('sfxtextdisplay').value))
                }
            }
        ]
        },
    AfterRender:function (){

    }
  },

}
    }
    Construct(json){
        return new this.ClassReg[json.class](json.context)
    }
    PlayEffect(SFX){
        // this accepts SFX objects, not JSON!
        this.Socket.PlayEffect(SFX)
    }
}
let MOSS = new MossLancer()
