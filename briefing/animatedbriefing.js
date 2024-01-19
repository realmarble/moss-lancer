async function Briefing(object) {
  typeitid = randomID(36)
  object.RandomID = typeitid
  introhtml = "";
  if ((object.Intro = true)) {
    try {
      introhtml = await renderTemplate(`modules/moss-lancer/templates/briefings/intros/${object.IntroData.type}.hbs`,object)
    } catch (error) {
      introhtml = `
    <div id="standby" style="width:100%;height:100%;background-size: 40px 40px;
  background-image: radial-gradient(circle, ${object.BackgroundAccent} 1px, rgba(0, 0, 0, 0) 1px);background-color: ${object.BackgroundColor};font-family: 'Ubuntu Mono', monospace;
  color: ${object.TextColor};">
  <script>
    document.getElementById("standby").style.display="none"
  document.getElementById("briefingcontainer").style.display="block"
    </script>
    </div>
    `;
    }
  }
  try {
    introhtml = await renderTemplate(`modules/moss-lancer/templates/briefings/intros/${object.IntroData.type}.hbs`,object)  
  } catch (error) {
    ui.notifications.error("Error in Intro Params:",e);
    return
  }
  try {
    briefinghtml = await renderTemplate(`modules/moss-lancer/templates/briefings/layouts/${object.LayoutType}.hbs`,object)
  } catch (error) {
    ui.notifications.error("Error in Briefing Params:",e);
    return
  }
  let brief = new BriefingWindow(String.raw`${introhtml + briefinghtml}`,typeitid)
  brief.render(true);
}

class BriefingEditor extends BaseEditor {
  constructor() {
    super();
    this.config = MOSS.EditorConfigs.BriefingEditor;
  }
}

class BriefingWindow extends Application {
  constructor(content,typeitid = randomID(10)) {
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

