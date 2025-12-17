class FrameViewerSFX extends SFX {
    constructor(context = {
      FrameSource : "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      FrameAttributes: `style="width:100%;height:100%"`
    }){
        super(context)
    }
    async Play(){
        new FrameViewerWindow(this.context).render(true)
    }
}
class FrameViewerWindow extends Application {
  constructor(context) {
      super();
      this.context = context
    }
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["no-padding"],
      popOut: true,
      template: "modules/moss-lancer/templates/misc/frameviewer.hbs",
      width: 716,
      height: 720,
      baseApplication: "FrameViewer",
      title: "INCOMING TRANSMISSION...",
      resizable:true
    });
  }
  getData() {
      const data = super.getData();
      data.context = this.context;
      return data;
    }
}
FrameViewerSFX.register()