async function _timer(ms) {return new Promise((res) => setTimeout(res, ms));}
function _addstyle(style) {
    let e = document.createElement("style");
    e.innerHTML = style
    document.head.appendChild(e);
    return e
}

class SFX {
  constructor(context = {}) {
    this.context = context;
  }
  async Play() {
    console.log("Playing SFX with context:", this.context);
  }
  toJSON(){
    let r = {}
    r.class = this.constructor.name
    r.context = this.context
    return r;
  }
  static register() {
    console.log(`moss-lancer | Registered ${this.name}.`)
    MOSS.ClassReg[this.name] = this;
  }
}