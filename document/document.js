// this is not being pushed out in 0.0.6, it needs more work.
//i'm not even sure if this makes sense anyway
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


class Dossier extends Application{
  constructor(data) {
    super();
    this.data = data
  }
  
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["no-padding"],
      popOut: true,
      template: "modules/moss-lancer/templates/dossier/dossier.hbs",
      width: 900,
      height: 1100,
      baseApplication: "DocumentWindow",
      title: "Document Viewer",
    });


  }
  getData() {
    data = super.getData();
    object = {
      "characters": [
        {
          "name": "Persons Of Interest",
          "contents": [
            {
              "name": "Raymond McMillen",
              "data": {"test":"this is data for Raymond mcMillen"},
              "template": "test"
            },
            {
              "name": "CIA Profile",
              "data": {},
              "template": "ciaprofile"
            }
          ]
        }
      ],
      "contacts": [],
      "reserves": [],
      "objectives": []
    };
    object.forEach(section => {
      section.forEach(section => {
      section.contents.forEach(content => {
        content.data = JSON.stringify(content.data)
      })
      });
    });
    return object
  } 
}