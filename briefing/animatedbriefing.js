async function Briefing(object) {
  typeitid = foundry.utils.randomID(36);
  object.randomID = typeitid;
  introhtml = "";
  if (object.Intro == true) {
    introhtml = await renderTemplate(`modules/moss-lancer/templates/briefings/intros/${object.IntroData.type}.hbs`,object);
  } else {
    introhtml = await renderTemplate(`modules/moss-lancer/templates/briefings/intros/none.hbs`,object);
  }

  try {
    briefinghtml = await renderTemplate(`modules/moss-lancer/templates/briefings/layouts/${object.LayoutType}.hbs`,object);
  } catch (error) {
    ui.notifications.error(`Error in Briefing Params: ${error}`);
    return;
  }
  let brief = new BriefingWindow(String.raw`${introhtml + briefinghtml}`,typeitid);
  brief.render(true);
}

class BriefingEditor extends BaseEditor {
  constructor() {
    super();
    this.config = MOSS.EditorConfigs.BriefingEditor;
  }
}

class BriefingWindow extends Application {
  constructor(content, typeitid = foundry.utils.randomID(10)) {
    super();
    this.content = content;
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
    data.randomID = this.typeitid; //this is for supporting multiple instances of windows with dynamically typed text.
    return data;
  }
}

// class BriefingWindow extends HandlebarsApplicationMixin(ApplicationV2) { //what a pain
//   constructor(content, typeitid = foundry.utils.randomID(10)) {
//     super();
//     this.content = content;
//     this.typeitid = typeitid;
//   }
//   static PARTS = {
//     form: {
//       template: "modules/moss-lancer/templates/briefings/briefing.hbs",
//     }
//   }
//   static DEFAULT_OPTIONS = {
//     classes: ["no-padding"],
//     window : {
//       title: "STAND BY...",
//     },
//     position : {
//       width: 1400,
//       height: 700,
//     }
//   }
//   async _preparePartContext(part,context){
//     context.html = this.content;
//     context.randomID = this.typeitid; //this is for supporting multiple instances of windows with dynamically typed text.
//     return context;
//   }
// }
