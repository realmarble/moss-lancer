class Editor extends Application {
    constructor(config){
      super();
      this.config = config
    }
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes:["no-padding","display-block"],
        popOut: true,
        template:"modules/moss-lancer/templates/apps/editor.hbs",
        width:1400,
        height:800,
        baseApplication: "Editor",
        title:"Editor",
        // tabs: [{
        //   group: 'primary-tabs',
        //   navSelector: '.tabs',
        //   contentSelector: '.content',
        //   initial: 'tab1',
        // }]
      });
    }
    getData() {
      return this.config;
    }
    activateListeners(html){
      super.activateListeners(html);
    }
}