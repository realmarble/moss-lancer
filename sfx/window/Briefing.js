class Briefing extends SFX {
  constructor(context) {
    super(context);
  }
  async Play() {
    let typeitid = randomID(36);
    this.context.randomID = typeitid;
    this.context.RandomID = typeitid;
    let introhtml, briefinghtml, brief;
    if (this.context.Intro) {
      introhtml = await foundry.applications.handlebars.renderTemplate(
        `modules/moss-lancer/templates/briefings/intros/${this.context.IntroData.type}.hbs`,
        this.context,
      );
    } else {
      introhtml = await foundry.applications.handlebars.renderTemplate(
        `modules/moss-lancer/templates/briefings/intros/none.hbs`,
        this.context,
      );
    }
        try {
            briefinghtml = await foundry.applications.handlebars.renderTemplate(`modules/moss-lancer/templates/briefings/layouts/${this.context.LayoutType}.hbs`,this.context);
        } catch (error) {
            ui.notifications.error(`Error in Briefing: ${error}`);
            return;
        }
    brief = new BriefingWindowV2(
      String.raw`${introhtml + briefinghtml}`,
      typeitid,
    );
    brief.render(true);
  }
}
class BriefingWindowV2 extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2)  {
  constructor(content, typeitid = foundry.utils.randomID(10)) {
    super();
    this.content = content;
    this.typeitid = typeitid;
  }
  static DEFAULT_OPTIONS = {
    classes: ["no-padding", "no-overflow"], 
    position: {
      width: 1600,
      height: 900,
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
    context.RandomID = this.typeitid;
    return context;
  }

  async _onRender(context, options) {
    super._onRender(context, options);
    this._fixBriefingPadding();
    this._initializeTypedElements();
    this._executeEmbeddedScripts();
  }

  _fixBriefingPadding() {
    const briefs = Array.from(this.element.querySelectorAll(".briefing-content"));
    briefs.forEach((element) => {
      if (element.parentElement) element.parentElement.style.padding = "0px";
    });
  }

  _initializeTypedElements() {
    const typeClass = `.typed${this.typeitid}`;
    const elements = Array.from(this.element.querySelectorAll(typeClass));
    elements.forEach((element) => {
      if (!(element instanceof HTMLElement)) return;
      if (element.dataset.typeitInitialized === "true") return;
      const text = element.getAttribute("data-text");
      const speed = parseInt(element.getAttribute("data-textspeed")) || 5;
      if (!text) return;
      element.dataset.typeitInitialized = "true";
      new TypeIt(element, {
        strings: text,
        speed: speed,
        waitUntilVisible: true,
        cursor: false,
      }).go();
    });
  }

  _executeEmbeddedScripts() {
    const scripts = Array.from(this.element.querySelectorAll("script"));
    scripts.forEach((script) => {
      if (!script.parentElement) return;
      const newScript = document.createElement("script");
      let scriptType = script.getAttribute("type");
      if (!scriptType && !script.src) {
        scriptType = "module";
      }
      if (scriptType) {
        newScript.setAttribute("type", scriptType);
      }
      Array.from(script.attributes).forEach((attr) => {
        if (attr.name === "type") return;
        newScript.setAttribute(attr.name, attr.value);
      });
      if (script.src) {
        newScript.src = script.src;
        newScript.async = false;
      } else {
        newScript.textContent = script.textContent;
      }
      script.parentElement.replaceChild(newScript, script);
    });
  }
}
Briefing.register();
