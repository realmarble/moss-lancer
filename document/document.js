
class DocumentWindow extends Application {
    constructor(content) {
      super();
      this.content = content
    }
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["no-padding"],
        popOut: true,
        template: "modules/moss-lancer/templates/document.hbs",
        width: 720,
        height: 900,
        baseApplication: "DocumentWindow",
        title: "Document Viewer",
      });


    }
    getData() {
      const data = super.getData();
      data.html = this.content;
      return data;
    }
}
function OpenDocument(data){

doc = new DocumentWindow(data.content)
return doc.render(true)
}

class DocumentEditor extends BaseEditor {
  constructor() {
    super();
    this.config = MOSS.EditorConfigs.DocumentEditor;
  }
}
