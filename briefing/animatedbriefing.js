
async function Briefing(object) {
  typeitid = makeid(36)
  object.RandomID = typeitid
  console.log("ID:",typeitid)
  intros = {
    loadscreen: renderTemplate('modules/moss-lancer/templates/briefings/intros/loadscreen.hbs',object),
    logo: renderTemplate('modules/moss-lancer/templates/briefings/intros/logo.hbs',object),
    brigador: renderTemplate('modules/moss-lancer/templates/briefings/intros/brigador.hbs',object),
    encrypted: renderTemplate('modules/moss-lancer/templates/briefings/intros/encrypted.hbs',object),
    text: renderTemplate('modules/moss-lancer/templates/briefings/intros/text.hbs',object)
  };
  layouts = {
    classic: renderTemplate('modules/moss-lancer/templates/briefings/layouts/classic.hbs',object),
    corporate:renderTemplate('modules/moss-lancer/templates/briefings/layouts/corporate.hbs',object)
  };
  introhtml = "";
  if ((object.Intro = true)) {
    try {
      introhtml = intros[object.IntroData.type];
    } catch (error) {
      introhtml = `
    <div id="standby" style="width:100%;height:100%;background-size: 40px 40px;
  background-image: radial-gradient(circle, ${object.BackgroundAccent} 1px, rgba(0, 0, 0, 0) 1px);background-color: ${object.BackgroundColor};font-family: 'Ubuntu Mono', monospace;
  color: ${object.TextColor};">
  <script>
    list=Array.from(document.getElementsByClassName("typed"))
    list.forEach(element => {
      text= element.getAttribute("data-text")
      new TypeIt(element, {
    strings: text,
    speed: 5,
    waitUntilVisible: true,
    cursor: false,
  }).go();
  
    });
    document.getElementById("standby").style.display="none"
  document.getElementById("briefingcontainer").style.display="block"
    </script>
    </div>
    `;
    }
  }
  let brief = new BriefingWindow(String.raw`${await intros[object.IntroData.type] + await layouts[object.LayoutType]}`,typeitid)
  brief.render(true);
}

function briefcontroller() {
  let briefcontroller = new BriefingController();
  briefcontroller.render(true);
}

function briefingeditor() {
  //we define the available options in constants.js
  let briefeditor = new BriefingEditor(BriefingEditorConfig);
  briefeditor.render(true);
}

class BriefingEditor extends Application {
  constructor(config) {
    super();
    this.config = config;
  }
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["no-padding"],
      popOut: true,
      template: "modules/moss-lancer/templates/briefingeditor.hbs",
      width: 1400,
      height: 720,
      baseApplication: "BriefingEditor",
      title: "Briefing Editor",
    });
  }
  getData() {
    return this.config;
  }
}
class BriefingController extends Application {
  constructor() {
    super();
  }
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["no-padding"],
      popOut: true,
      template: "modules/moss-lancer/templates/briefingcontroller.html",
      width: 500,
      height: 800,
      baseApplication: "BriefingController",
      title: "Briefing Controller",
    });
  }
}
class BriefingWindow extends Application {
  constructor(content,typeitid) {
    super();
    this.content = content
    this.typeitid = typeitid;
  }
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["no-padding"],
      popOut: true,
      template: "modules/moss-lancer/templates/briefings/briefing.hbs",
      width: 1400,
      height: 700,
      baseApplication: "BriefingWindow",
      title: "STAND BY...",
    });
  }
  getData() {
    const data = super.getData();
    data.html = this.content;
    data.RandomID = this.typeitid //this is for supporting multiple instances of windows with dynamically typed text.
    return data;
  }
}

