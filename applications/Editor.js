class EditorV2 extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2,
) {
  constructor(config = {}) {
    super();
    this.config = config;
  }
  static DEFAULT_OPTIONS = {
    classes: ["no-padding", "display-block"],
    position: {
      width: 1400,
      height: 800,
    },
    window: {
      resizable: true,
      title: "Editor", // Just the localization key
    },
  };
  static PARTS = {
    editor: {
      template: "modules/moss-lancer/templates/apps/editor.hbs",
      root: true,
    },
  };
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    return this.config ? mergeObject(context, this.config) : context;
  }
  async _onRender(context, options) {
    super._onRender(context, options);
    let WINDOW = this.element.querySelector("section");
    let inputsdiv = WINDOW.querySelector("#settingdiv");
    let btns = Array.from(
      WINDOW.querySelector("#EditorNav").getElementsByTagName("button"),
    );
    Object.keys(MOSS.Config.EditorAssemblies).forEach((key, index) => {
      btns[index].addEventListener("click", async () => {
        let html = await foundry.applications.handlebars.renderTemplate(`modules/moss-lancer/templates/settings.hbs`,MOSS.Config.EditorAssemblies[key]);
        inputsdiv.innerHTML = html;
        this.Hydrate(inputsdiv, MOSS.Config.EditorAssemblies[key]);
      });
    });
    WINDOW.querySelector("#actioncontainer > button:nth-child(1)",).addEventListener("click", () => {submitGenericDialog(JSON.parse(document.querySelector("#editdisplay").value));});
    WINDOW.querySelector("#actioncontainer > button:nth-child(2)",).addEventListener("click", () => {MOSS.Construct(JSON.parse(document.querySelector("#editdisplay").value)).Play();});
  }
  Hydrate(html, data) {
    if (data.StructureOverride) {
      data.AfterRender();
      return;
    }
    data.DataSections.forEach((element) => {
      if (element.type == "select" && element.onchange) {
        Array.from(
          html.querySelectorAll(`#${element.Name}type`),
        )[0].addEventListener("change", element.onchange);
      }
      if (element.type == "button" && element.onclick) {
        Array.from(
          html.querySelectorAll(`#${element.Name}button`),
        )[0].addEventListener("click", element.onclick);
      }
    });
    if (data.AfterRender) {
      data.AfterRender();
    }
  }
}
