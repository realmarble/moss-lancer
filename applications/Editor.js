class EditorV2 extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {
    constructor(config = {}){
      super();
      this.config = config;
    }
    static DEFAULT_OPTIONS = {
      classes:["no-padding","display-block"],
      position: {
        width:1400,
        height:800,
      },
      window: {
        resizable: true,
        title: "Editor", // Just the localization key
      },
    };
    static PARTS = {
      form: {
        template: "modules/moss-lancer/templates/apps/editor.hbs"
      }
    }
    async _prepareContext(options){
      const context = await super._prepareContext(options);
      return this.config ? mergeObject(context, this.config) : context;
    }
}