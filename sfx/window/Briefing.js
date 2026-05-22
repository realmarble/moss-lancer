class Briefing extends SFX {
    constructor(context){
        super(context)
    }
    async Play(){
        let typeitid = randomID(36);
        this.context.randomID = typeitid;
        let introhtml, briefinghtml,brief;
        if (this.context.Intro) {
            introhtml = await renderTemplate(`modules/moss-lancer/templates/briefings/intros/${this.context.IntroData.type}.hbs`,this.context); 
        } else {
            introhtml = await renderTemplate(`modules/moss-lancer/templates/briefings/intros/none.hbs`,this.context);
        }
        try {
            briefinghtml = await renderTemplate(`modules/moss-lancer/templates/briefings/layouts/${this.context.LayoutType}.hbs`,this.context);
        } catch (error) {
            ui.notifications.error(`Error in Briefing: ${error}`);
            return;
        }
          brief = new BriefingWindow(String.raw`${introhtml + briefinghtml}`,typeitid);
          brief.render(true);   
        
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
      classes: ["no-padding", "no-overflow"],
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
Briefing.register()