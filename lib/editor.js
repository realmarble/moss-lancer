class BaseEditor extends Application {
    constructor(config){
      super();
      this.config = config
    }
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes:["no-padding"],
        popOut: true,
        template:"modules/moss-lancer/templates/editor.hbs",
        width:1400,
        height:720,
        baseApplication: "Editor",
        title:"Editor"
      });
    }
    getData() {
      return this.config;
    }
    activateListeners(html){
      super.activateListeners(html);
      if (this.config.StructureOverride){this.config.AfterRender();return;}
    this.config.DataSections.forEach(element => {
    if (element.type == "select" && element.onchange) {
    Array.from(document.querySelectorAll(`#${element.Name}type`))[0].addEventListener("change", element.onchange);
    }
    if (element.type == "button" && element.onclick) {
      Array.from(document.querySelectorAll(`#${element.Name}button`))[0].addEventListener("click", element.onclick);
    }
    });
    this.config.ViewConfig.Buttons.forEach(element => {
      Array.from(document.querySelectorAll(`#viewbutton${element.Name}`))[0].addEventListener("click", element.onclick);
    });
    if (this.config.AfterRender) {
      this.config.AfterRender() 
    }
    }
  }