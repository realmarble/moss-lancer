const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
class Briefing extends SFX {
  constructor(context) {
    super(context);
  }
  async Play() {
    let typeitid = randomID(36);
    this.context.randomID = typeitid;
    let introhtml, briefinghtml, brief;
    if (this.context.Intro) {
      introhtml = await renderTemplate(
        `modules/moss-lancer/templates/briefings/intros/${this.context.IntroData.type}.hbs`,
        this.context,
      );
    } else {
      introhtml = await renderTemplate(
        `modules/moss-lancer/templates/briefings/intros/none.hbs`,
        this.context,
      );
    }
<<<<<<< Updated upstream
    async Play(){
        let typeitid = randomID(36);
        context.randomID = typeitid;
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
=======
    try {
      briefinghtml = await renderTemplate(
        `modules/moss-lancer/templates/briefings/layouts/${this.context.LayoutType}.hbs`,
        this.context,
      );
    } catch (error) {
      ui.notifications.error(`Error in Briefing: ${error}`);
      return;
>>>>>>> Stashed changes
    }
    brief = new BriefingWindowV2(
      String.raw`${introhtml + briefinghtml}`,
      typeitid,
    );
    brief.render(true);
  }
}
class BriefingWindowV2 extends HandlebarsApplicationMixin(ApplicationV2) {
  constructor(content, typeitid = foundry.utils.randomID(10)) {
    super();
    this.content = content;
    this.typeitid = typeitid;
  }
  static DEFAULT_OPTIONS = {
    classes: ["no-padding", "no-overflow"], 
    position: {
      width: 1400,
      height: 700,
    },
    window: {
      resizable: true,
      title: "STAND BY...", // Just the localization key
    },
  };
  static PARTS = {
  form: {
    template: 'modules/moss-lancer/templates/briefings/briefing.hbs'
  }
}
  async _prepareContext(options){
    const context = await super._prepareContext(options);
    context.html = this.content;
    context.randomID = this.typeitid;
    return context;
  }
}
Briefing.register();
