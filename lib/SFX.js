class SFX {
  constructor(context = {}) {
    this.context = context;
  }
  static timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
  timer(ms) {
    return this.constructor.timer(ms);
  }
  static addStyle(style) {
    const e = document.createElement("style");
    e.innerHTML = style;
    document.head.appendChild(e);
    return e;
  }
  addStyle(style) {
    return this.constructor.addStyle(style);
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