MOSS = {}
MOSS.ModuleVer = "0.0.62"
MOSS.BriefingConfig = {
  layout: [
    { DisplayName: "Classic", Name: "classic" }
  ],
  intro: [
    { DisplayName: "None", Name: "none" },
    { DisplayName: "Loadscreen", Name: "loadscreen" },
    { DisplayName: "Logo", Name: "logo" },
    { DisplayName: "Brigador", Name: "brigador" },
    { DisplayName: "Encrypted", Name: "encrypted" },
    { DisplayName: "Directive", Name: "directive" },
  ],
};
MOSS.WarningConfig = {
    type:[
    { DisplayName: "Standard", Name: "standard" },
    { DisplayName: "Airforce", Name: "airforce" },
    { DisplayName: "Meltdown", Name: "meltdown" },
    ]
};

MOSS.SFXConfig = {
  effects: [
    { DisplayName: "None", Name: "none" },
    { DisplayName: "Loadscreen", Name: "loadscreen" },
    { DisplayName: "Logo", Name: "logo" },
    { DisplayName: "Brigador", Name: "brigador" },
    { DisplayName: "Encrypted", Name: "encrypted" },
    { DisplayName: "Directive", Name: "directive" },
  ]  
}
MOSS.EditorConfigs ={
  BriefingEditor:{
    "Name":"Briefing Editor",
    "DataSections":[
      {
        "Name":"intro",
        "DisplayName":"Intro Options",
        "type":"select",
        "data":MOSS.BriefingConfig.intro,
        "onchange":async function () {
      introoptions = document.getElementById("introoptions");
      try {
        introoptions.innerHTML = await renderTemplate(`modules/moss-lancer/templates/briefings/settingtemplates/intro/${this.value}.html`,{})
        inputs = Array.prototype.slice.call(document.getElementById("introoptions").getElementsByTagName("input")).concat(Array.prototype.slice.call(document.getElementById("introoptions").getElementsByTagName("textarea")));
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
        "data":MOSS.BriefingConfig.layout,
        "onchange":async function () {
            briefingoptions = document.getElementById("briefingoptions");
            try {
              briefingoptions.innerHTML = await renderTemplate(`modules/moss-lancer/templates/briefings/settingtemplates/layout/${this.value}.html`,{})
              inputs = Array.prototype.slice.call(document.getElementById("briefingoptions").getElementsByTagName("input")).concat(Array.prototype.slice.call(document.getElementById("briefingoptions").getElementsByTagName("textarea")));
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
        <textarea
          name="DeployedForces"
          placeholder='Deployed Forces (Defined As Array)'
          style="width: 100%; height: 150px"
        ></textarea>
        <textarea
          name="Objectives"
          placeholder="Mission Objectives (Defined As Array)"
          style="width: 100%; height: 150px"
        ></textarea>
        <textarea
          name="Notes"
          placeholder="Mission Notes (Defined As Array)"
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
        "onclick":function () {
          var briefobject = {};
      //build a list of the inputs and sort them into the object
      briefingoptions = Array.prototype.slice
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
          briefobject[element.name] = JSON.parse(element.value);
        } catch (error) {
          briefobject[element.name] = element.value;
        }
      });
      briefobject.LayoutType = document.getElementById("briefingtype").value
      if (document.getElementById("introtype").value != "none") {
        briefobject.intro = true;
        briefobject.IntroData = {};
        briefobject["IntroData"].type =
          document.getElementById("introtype").value;
        introoptions = Array.prototype.slice
          .call(
            document.getElementById("introoptions").getElementsByTagName("input")
          )
          .concat(
            Array.prototype.slice.call(
              document
                .getElementById("introoptions")
                .getElementsByTagName("textarea")
            )
          );
        introoptions.forEach((element) => {
          try {
            briefobject["IntroData"][element.name] = JSON.parse(element.value);
          } catch (error) {
            briefobject["IntroData"][element.name] = element.value;
          }
        });
      }
      document.getElementById("brieftextdisplay").value = JSON.stringify(
        briefobject,
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
            onclick:function () {
                Briefing(JSON.parse(document.getElementById('brieftextdisplay').value));
            }
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
            "DisplayName":"Announcement Options",
            "type":"select",
            "data":MOSS.WarningConfig.type,
            "onchange":async function () {
                warningobject = {};
                introoptions = document.getElementById("announcementoptions");
              
                try {
                    introoptions.innerHTML = await renderTemplate(`modules/moss-lancer/templates/warnings/settingtemplates/${this.value}.html`,{})
                    inputs = Array.prototype.slice.call(document.getElementById("announcementoptions").getElementsByTagName("input")).concat(Array.prototype.slice.call(document.getElementById("announcementoptions").getElementsByTagName("textarea")));
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
                warningobject = {};
                warningobject.type = document.getElementById("announcementtype").value
                //build a list of the inputs and sort them into the object
                optionvalues = Array.prototype.slice.call(document.getElementById("announcementoptions").querySelectorAll("input[name]")).concat(Array.prototype.slice.call(document.getElementById("announcementoptions").querySelectorAll("textarea[name]")));
                
                optionvalues.forEach((element) => {
                  try {
                    warningobject[element.name] = JSON.parse(element.value);
                  } catch (error) {
                    warningobject[element.name] = element.value;
                  }
                });
                document.getElementById("warningtextdisplay").value = JSON.stringify(
                  warningobject,
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
  DocumentEditor:{StructureOverride:true,html:
  `
  <textarea id="documenttext" style="width: 100%; height: 94%; resize: none" placeholder="enter your Document text here. HTML is supported."></textarea>
  <div style="display: inline-flex;flex-direction: row;justify-content: center;width:100%">
    <button style="height: 5%;width:10%;" id="doceditorload"><i class="fa-solid fa-file-export"></i></button>
      <button style="height: 5%" id="doceditorsave">Save</button>
      <button style="height: 5%" id="doceditorpreview">Preview</button>
  </div>
  `,
AfterRender:function(){
  document.getElementById("doceditorpreview").addEventListener("click", function() {
    OpenDocument({content:document.getElementById("documenttext").value})
  })
  document.getElementById("doceditorsave").addEventListener("click", function() {
    submitGenericDialog({content:document.getElementById("documenttext").value},"Document","Document")
  })
  document.getElementById("doceditorload").addEventListener("click", function() {
    fp = new FilePicker({ //thanks ipso
      type: "text",
      current: "",
      callback: async path => {
          let response = await foundry.utils.fetchWithTimeout(path);
          console.log(response)
          let data = await response.text()
          // Exit when done
          document.getElementById("documenttext").value = data;
      }
  });
  return fp.browse();

  })
}},
  SFXEditor:{}
}