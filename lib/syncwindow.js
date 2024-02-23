class SyncWindow extends Application {
  #functionwrapper = (data) => {
    if (data.id == this.windowid) {
      this.socketfunction(data.data);
    }
  }
  socketfunction = function (data) {
    let elem = document.getElementById(data.target)
    if (!elem) return;
    switch (data.type) {
      case "click":
       //elem.click(); //this technically works, but causes a infinite feedback loop
       if (elem.onclick != null) {
        elem.onclick()
       }
        break;
      case "input":
        elem.value = data.value;
        break;
      case "change":
        elem.value = data.value;
        break;
      case "keyup":
        elem.innerText = data.value;
        break;
      default:
        break;
    }
  };
  send = function (data) {
    game.socket.emit("module.moss-lancer", {
      id: this.windowid,
      data: data,
    })
  }
  constructor(id, options = {}) {
    super(options);
    this.windowid = id;
    game.socket.on("module.moss-lancer", this.#functionwrapper);
  }
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      title: "Sync Window",
      template: "modules/moss-lancer/templates/syncwin.html",
      width: 400,
      height: 300,
    });
  }
  activateListeners(html){
     html[0].addEventListener('click', (event) => {
      this.send({type: "click",target: event.target.id});
     })
     html[0].addEventListener('input', (event) => {
      if (!event.target.isContentEditable) {
        this.send({type: "input",target: event.target.id,value: event.target.value});
       }
     })
     html[0].addEventListener('change', (event) => {
      this.send({type: "change",target: event.target.id,value: event.target.value});
     })
     html[0].addEventListener('keyup', (event) => {
       if (event.target.isContentEditable) {
        this.send({type: "keyup",target: event.target.id,value: event.target.innerText});
       }
     }) 
  }
  getData() {
    return {};
  }
  close() {
    super.close();
    game.socket.off("module.moss-lancer", this.#functionwrapper);
  }
}
